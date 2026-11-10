/**
 * Gọi thẳng PubChem PUG-REST từ trình duyệt (site tĩnh, không có server riêng).
 * - Giới hạn tốc độ phía client: tối đa 4 yêu cầu/giây (PubChem cho phép 5).
 * - Cache trong IndexedDB 30 ngày; trình duyệt chặn IndexedDB (ẩn danh) thì chỉ cache trong bộ nhớ.
 */
const API = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const TTL = 30 * 24 * 3600 * 1000;
const GAP_MS = 250;

let last = 0;
let chain: Promise<unknown> = Promise.resolve();
/** Xếp hàng: mỗi yêu cầu cách nhau ít nhất GAP_MS */
function throttled<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(async () => {
    const wait = last + GAP_MS - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    last = Date.now();
    return fn();
  });
  chain = run.catch(() => undefined);
  return run;
}

// --- Cache IndexedDB ---
const memory = new Map<string, string>();
let dbp: Promise<IDBDatabase | null> | null = null;
function db(): Promise<IDBDatabase | null> {
  dbp ??= new Promise((resolve) => {
    try {
      const req = indexedDB.open('pubchem-cache', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('responses');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbp;
}
async function cacheGet(key: string): Promise<string | null> {
  if (memory.has(key)) return memory.get(key)!;
  const d = await db();
  if (!d) return null;
  return new Promise((resolve) => {
    try {
      const req = d.transaction('responses').objectStore('responses').get(key);
      req.onsuccess = () => {
        const v = req.result as { text: string; at: number } | undefined;
        resolve(v && Date.now() - v.at < TTL ? v.text : null);
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}
async function cacheSet(key: string, text: string) {
  memory.set(key, text);
  const d = await db();
  if (!d) return;
  try {
    d.transaction('responses', 'readwrite')
      .objectStore('responses')
      .put({ text, at: Date.now() }, key);
  } catch {
    // hết dung lượng hoặc bị chặn: bỏ qua, vẫn còn cache trong bộ nhớ
  }
}

export class PubChemError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

async function getText(path: string): Promise<string> {
  const cached = await cacheGet(path);
  if (cached != null) return cached;
  const res = await throttled(() => fetch(`${API}${path}`));
  if (!res.ok) throw new PubChemError(res.status, `PubChem ${res.status}`);
  const text = await res.text();
  await cacheSet(path, text);
  return text;
}

export interface PubChemCompound {
  cid: number;
  title: string;
  formula: string;
  mw: number;
  iupac: string | null;
  smiles: string | null;
  charge: number;
}

/** Tìm CID theo tên (tiếng Anh), công thức không dấu cách, hoặc chính CID */
export async function findCid(query: string): Promise<number | null> {
  const q = query.trim();
  if (/^\d+$/.test(q)) return Number(q);
  try {
    const j = JSON.parse(await getText(`/compound/name/${encodeURIComponent(q)}/cids/JSON`));
    return j.IdentifierList?.CID?.[0] ?? null;
  } catch (e) {
    if (e instanceof PubChemError && e.status === 404) return null;
    throw e;
  }
}

/** Tìm CID theo SMILES (khớp đúng cấu trúc). Chỉ gọi khi người dùng bấm: SMILES được gửi tới PubChem. */
export async function findCidBySmiles(smiles: string): Promise<number | null> {
  try {
    const j = JSON.parse(await getText(`/compound/smiles/${encodeURIComponent(smiles)}/cids/JSON`));
    const cid = j.IdentifierList?.CID?.[0];
    return cid && cid > 0 ? cid : null;
  } catch (e) {
    if (e instanceof PubChemError && (e.status === 404 || e.status === 400)) return null;
    throw e;
  }
}

export async function getCompound(cid: number): Promise<PubChemCompound> {
  const props = 'Title,MolecularFormula,MolecularWeight,IUPACName,SMILES,Charge';
  const j = JSON.parse(await getText(`/compound/cid/${cid}/property/${props}/JSON`));
  const p = j.PropertyTable.Properties[0];
  return {
    cid,
    title: p.Title ?? `CID ${cid}`,
    formula: p.MolecularFormula,
    mw: Number(p.MolecularWeight),
    iupac: p.IUPACName ?? null,
    smiles: p.SMILES ?? null,
    charge: p.Charge ?? 0,
  };
}

/** SDF 3D nếu PubChem có, không thì 2D */
export async function getSdf(cid: number): Promise<{ text: string; dim: 2 | 3 }> {
  try {
    return { text: await getText(`/compound/cid/${cid}/record/SDF?record_type=3d`), dim: 3 };
  } catch (e) {
    if (!(e instanceof PubChemError) || e.status !== 404) throw e;
    return { text: await getText(`/compound/cid/${cid}/record/SDF?record_type=2d`), dim: 2 };
  }
}
