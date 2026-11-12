/**
 * Hợp chất tiêu biểu (chương trình phổ thông), ít nhất 5 chất cho mỗi nguyên tố ưu tiên.
 * - q: tên tiếng Anh để tra PubChem (hoặc cid để chỉ định chính xác)
 * - f: công thức mong đợi; fetch-compounds so thành phần nguyên tố với PubChem, lệch thì báo lỗi
 * - vi: tên tiếng Việt theo cách gọi quen thuộc trong SGK
 * Nguyên tố của mỗi chất được suy ra từ công thức, không cần khai báo.
 */
export interface CuratedCompound {
  q?: string;
  cid?: number;
  f: string;
  vi: string;
}

/** 30 nguyên tố ưu tiên của M4 (đủ ảnh, đơn chất 3D, ≥ 5 hợp chất) */
export const PRIORITY = [
  'H',
  'Li',
  'B',
  'C',
  'N',
  'O',
  'F',
  'Na',
  'Mg',
  'Al',
  'Si',
  'P',
  'S',
  'Cl',
  'K',
  'Ca',
  'Cr',
  'Mn',
  'Fe',
  'Ni',
  'Cu',
  'Zn',
  'Br',
  'Ag',
  'Sn',
  'I',
  'Ba',
  'Au',
  'Hg',
  'Pb',
];

export const COMPOUNDS: CuratedCompound[] = [
  // Hiđro, oxi, cacbon, nitơ: phân tử cơ bản
  { q: 'water', f: 'H2O', vi: 'Nước' },
  { q: 'hydrogen peroxide', f: 'H2O2', vi: 'Hiđro peoxit (oxi già)' },
  { q: 'hydrogen chloride', f: 'HCl', vi: 'Hiđro clorua (axit clohiđric)' },
  { q: 'ammonia', f: 'NH3', vi: 'Amoniac' },
  { q: 'methane', f: 'CH4', vi: 'Metan' },
  { q: 'carbon dioxide', f: 'CO2', vi: 'Cacbon đioxit' },
  { q: 'carbon monoxide', f: 'CO', vi: 'Cacbon monoxit' },
  { q: 'ethanol', f: 'C2H6O', vi: 'Etanol (rượu etylic)' },
  { q: 'glucose', cid: 5793, f: 'C6H12O6', vi: 'Glucozơ' },
  { q: 'acetylene', f: 'C2H2', vi: 'Axetilen' },
  { q: 'ethylene', f: 'C2H4', vi: 'Etilen' },
  { q: 'benzene', f: 'C6H6', vi: 'Benzen' },
  { q: 'acetic acid', f: 'C2H4O2', vi: 'Axit axetic' },
  { q: 'urea', f: 'CH4N2O', vi: 'Urê' },
  { q: 'nitric acid', f: 'HNO3', vi: 'Axit nitric' },
  { q: 'nitrogen dioxide', f: 'NO2', vi: 'Nitơ đioxit' },
  { q: 'nitric oxide', f: 'NO', vi: 'Nitơ monoxit' },
  { q: 'nitrous oxide', f: 'N2O', vi: 'Đinitơ oxit (khí cười)' },
  { q: 'ammonium nitrate', f: 'NH4NO3', vi: 'Amoni nitrat' },
  { q: 'ammonium chloride', f: 'NH4Cl', vi: 'Amoni clorua' },
  // Liti
  { q: 'lithium hydroxide', f: 'LiOH', vi: 'Liti hiđroxit' },
  { q: 'lithium carbonate', f: 'Li2CO3', vi: 'Liti cacbonat' },
  { q: 'lithium chloride', f: 'LiCl', vi: 'Liti clorua' },
  { q: 'lithium oxide', f: 'Li2O', vi: 'Liti oxit' },
  { q: 'lithium fluoride', f: 'LiF', vi: 'Liti florua' },
  // Bo
  { q: 'boric acid', f: 'H3BO3', vi: 'Axit boric' },
  { q: 'boron trioxide', f: 'B2O3', vi: 'Điboron trioxit (bo oxit)' },
  { q: 'boron trifluoride', f: 'BF3', vi: 'Bo triflorua' },
  { q: 'sodium borohydride', f: 'NaBH4', vi: 'Natri borohiđrua' },
  { q: 'borax', f: 'Na2B4O7·10H2O', vi: 'Hàn the (borax)' },
  // Flo
  { q: 'hydrogen fluoride', f: 'HF', vi: 'Hiđro florua' },
  { q: 'sodium fluoride', f: 'NaF', vi: 'Natri florua' },
  { q: 'calcium fluoride', f: 'CaF2', vi: 'Canxi florua (fluorit)' },
  { q: 'sulfur hexafluoride', f: 'SF6', vi: 'Lưu huỳnh hexaflorua' },
  { q: 'tetrafluoromethane', f: 'CF4', vi: 'Cacbon tetraflorua (tetraflometan)' },
  // Natri
  { q: 'sodium chloride', f: 'NaCl', vi: 'Natri clorua (muối ăn)' },
  { q: 'sodium hydroxide', f: 'NaOH', vi: 'Natri hiđroxit (xút)' },
  { q: 'sodium carbonate', f: 'Na2CO3', vi: 'Natri cacbonat (sôđa)' },
  { q: 'sodium bicarbonate', f: 'NaHCO3', vi: 'Natri hiđrocacbonat (baking soda)' },
  { q: 'sodium sulfate', f: 'Na2SO4', vi: 'Natri sunfat' },
  { q: 'sodium nitrate', f: 'NaNO3', vi: 'Natri nitrat' },
  { q: 'sodium hypochlorite', f: 'NaClO', vi: 'Natri hipoclorit (nước Javen)' },
  // Magie
  { q: 'magnesium oxide', f: 'MgO', vi: 'Magie oxit' },
  { q: 'magnesium chloride', f: 'MgCl2', vi: 'Magie clorua' },
  { q: 'magnesium sulfate', f: 'MgSO4', vi: 'Magie sunfat' },
  { q: 'magnesium hydroxide', f: 'Mg(OH)2', vi: 'Magie hiđroxit' },
  { q: 'magnesium carbonate', f: 'MgCO3', vi: 'Magie cacbonat' },
  // Nhôm
  { q: 'aluminum oxide', f: 'Al2O3', vi: 'Nhôm oxit' },
  { q: 'aluminum chloride', f: 'AlCl3', vi: 'Nhôm clorua' },
  { q: 'aluminum hydroxide', f: 'Al(OH)3', vi: 'Nhôm hiđroxit' },
  { q: 'aluminum sulfate', f: 'Al2(SO4)3', vi: 'Nhôm sunfat' },
  { q: 'potassium alum', cid: 24856, f: 'KAl(SO4)2', vi: 'Phèn chua (khan)' },
  // Silic
  { q: 'silicon dioxide', f: 'SiO2', vi: 'Silic đioxit (cát, thạch anh)' },
  { q: 'silane', f: 'SiH4', vi: 'Silan' },
  { q: 'silicon carbide', f: 'SiC', vi: 'Silic cacbua' },
  { q: 'sodium metasilicate', f: 'Na2SiO3', vi: 'Natri silicat (thuỷ tinh lỏng)' },
  { q: 'silicon tetrachloride', f: 'SiCl4', vi: 'Silic tetraclorua' },
  // Photpho
  { q: 'phosphoric acid', f: 'H3PO4', vi: 'Axit photphoric' },
  { q: 'tetraphosphorus decaoxide', f: 'P4O10', vi: 'Photpho(V) oxit (P₄O₁₀, thường viết P₂O₅)' },
  { q: 'phosphine', f: 'PH3', vi: 'Photphin' },
  { q: 'tricalcium phosphate', f: 'Ca3(PO4)2', vi: 'Canxi photphat' },
  { q: 'phosphorus pentachloride', f: 'PCl5', vi: 'Photpho pentaclorua' },
  // Lưu huỳnh
  { q: 'sulfuric acid', f: 'H2SO4', vi: 'Axit sunfuric' },
  { q: 'sulfur dioxide', f: 'SO2', vi: 'Lưu huỳnh đioxit' },
  { q: 'sulfur trioxide', f: 'SO3', vi: 'Lưu huỳnh trioxit' },
  { q: 'hydrogen sulfide', f: 'H2S', vi: 'Hiđro sunfua' },
  { q: 'sodium thiosulfate', f: 'Na2S2O3', vi: 'Natri thiosunfat' },
  // Clo
  { q: 'potassium chlorate', f: 'KClO3', vi: 'Kali clorat' },
  { q: 'carbon tetrachloride', f: 'CCl4', vi: 'Cacbon tetraclorua' },
  { q: 'hypochlorous acid', f: 'HClO', vi: 'Axit hipoclorơ' },
  { q: 'chloroform', f: 'CHCl3', vi: 'Clorofom' },
  // Kali
  { q: 'potassium chloride', f: 'KCl', vi: 'Kali clorua' },
  { q: 'potassium hydroxide', f: 'KOH', vi: 'Kali hiđroxit' },
  { q: 'potassium nitrate', f: 'KNO3', vi: 'Kali nitrat (diêm tiêu)' },
  { q: 'potassium permanganate', f: 'KMnO4', vi: 'Kali pemanganat (thuốc tím)' },
  { q: 'potassium carbonate', f: 'K2CO3', vi: 'Kali cacbonat (potat)' },
  { q: 'potassium iodide', f: 'KI', vi: 'Kali iotua' },
  // Canxi
  { q: 'calcium carbonate', f: 'CaCO3', vi: 'Canxi cacbonat (đá vôi)' },
  { q: 'calcium oxide', f: 'CaO', vi: 'Canxi oxit (vôi sống)' },
  { q: 'calcium hydroxide', f: 'Ca(OH)2', vi: 'Canxi hiđroxit (vôi tôi)' },
  { q: 'calcium chloride', f: 'CaCl2', vi: 'Canxi clorua' },
  { q: 'calcium sulfate', f: 'CaSO4', vi: 'Canxi sunfat (thạch cao khan)' },
  // Crom
  { q: 'chromium(III) oxide', f: 'Cr2O3', vi: 'Crom(III) oxit' },
  { q: 'potassium dichromate', f: 'K2Cr2O7', vi: 'Kali đicromat' },
  { q: 'chromium(III) chloride', f: 'CrCl3', vi: 'Crom(III) clorua' },
  { q: 'potassium chromate', f: 'K2CrO4', vi: 'Kali cromat' },
  { q: 'chromium trioxide', f: 'CrO3', vi: 'Crom(VI) oxit' },
  // Mangan
  { q: 'manganese dioxide', f: 'MnO2', vi: 'Mangan đioxit' },
  { q: 'manganese(II) chloride', cid: 24480, f: 'MnCl2', vi: 'Mangan(II) clorua' },
  { q: 'manganese(II) sulfate', f: 'MnSO4', vi: 'Mangan(II) sunfat' },
  { q: 'manganese(II) oxide', f: 'MnO', vi: 'Mangan(II) oxit' },
  // Sắt
  { q: 'ferric oxide', f: 'Fe2O3', vi: 'Sắt(III) oxit' },
  { q: 'ferrosoferric oxide', f: 'Fe3O4', vi: 'Sắt từ oxit' },
  { q: 'ferric chloride', f: 'FeCl3', vi: 'Sắt(III) clorua' },
  { q: 'ferrous chloride', f: 'FeCl2', vi: 'Sắt(II) clorua' },
  { q: 'ferrous sulfate', f: 'FeSO4', vi: 'Sắt(II) sunfat' },
  { q: 'pyrite', f: 'FeS2', vi: 'Pirit sắt' },
  // Niken
  { q: 'nickel(II) oxide', f: 'NiO', vi: 'Niken(II) oxit' },
  { q: 'nickel(II) chloride', f: 'NiCl2', vi: 'Niken(II) clorua' },
  { q: 'nickel(II) sulfate', f: 'NiSO4', vi: 'Niken(II) sunfat' },
  { q: 'nickel(II) hydroxide', f: 'Ni(OH)2', vi: 'Niken(II) hiđroxit' },
  { q: 'nickel tetracarbonyl', f: 'Ni(CO)4', vi: 'Niken tetracacbonyl' },
  // Đồng
  { q: 'cupric oxide', f: 'CuO', vi: 'Đồng(II) oxit' },
  { q: 'cuprous oxide', f: 'Cu2O', vi: 'Đồng(I) oxit' },
  { q: 'cupric sulfate', f: 'CuSO4', vi: 'Đồng(II) sunfat' },
  { q: 'cupric chloride', f: 'CuCl2', vi: 'Đồng(II) clorua' },
  { q: 'cupric nitrate', f: 'Cu(NO3)2', vi: 'Đồng(II) nitrat' },
  { q: 'cupric hydroxide', f: 'Cu(OH)2', vi: 'Đồng(II) hiđroxit' },
  // Kẽm
  { q: 'zinc oxide', f: 'ZnO', vi: 'Kẽm oxit' },
  { q: 'zinc chloride', f: 'ZnCl2', vi: 'Kẽm clorua' },
  { q: 'zinc sulfate', f: 'ZnSO4', vi: 'Kẽm sunfat' },
  { q: 'zinc sulfide', f: 'ZnS', vi: 'Kẽm sunfua' },
  { q: 'zinc hydroxide', f: 'Zn(OH)2', vi: 'Kẽm hiđroxit' },
  // Brom
  { q: 'hydrogen bromide', f: 'HBr', vi: 'Hiđro bromua' },
  { q: 'sodium bromide', f: 'NaBr', vi: 'Natri bromua' },
  { q: 'potassium bromide', f: 'KBr', vi: 'Kali bromua' },
  { q: 'bromomethane', f: 'CH3Br', vi: 'Metyl bromua' },
  // Bạc
  { q: 'silver nitrate', f: 'AgNO3', vi: 'Bạc nitrat' },
  { q: 'silver chloride', f: 'AgCl', vi: 'Bạc clorua' },
  { q: 'silver bromide', f: 'AgBr', vi: 'Bạc bromua' },
  { q: 'silver iodide', f: 'AgI', vi: 'Bạc iotua' },
  { q: 'disilver oxide', f: 'Ag2O', vi: 'Bạc oxit' },
  // Thiếc
  { q: 'tin dioxide', f: 'SnO2', vi: 'Thiếc(IV) oxit' },
  { q: 'stannous chloride', f: 'SnCl2', vi: 'Thiếc(II) clorua' },
  { q: 'stannic chloride', f: 'SnCl4', vi: 'Thiếc(IV) clorua' },
  { q: 'tin(II) oxide', f: 'SnO', vi: 'Thiếc(II) oxit' },
  { q: 'tin(II) sulfide', f: 'SnS', vi: 'Thiếc(II) sunfua' },
  // Iot
  { q: 'hydrogen iodide', f: 'HI', vi: 'Hiđro iotua' },
  { q: 'sodium iodide', f: 'NaI', vi: 'Natri iotua' },
  { q: 'iodoform', f: 'CHI3', vi: 'Iođofom' },
  // Bari
  { q: 'barium sulfate', f: 'BaSO4', vi: 'Bari sunfat' },
  { q: 'barium chloride', f: 'BaCl2', vi: 'Bari clorua' },
  { q: 'barium carbonate', f: 'BaCO3', vi: 'Bari cacbonat' },
  { q: 'barium hydroxide', f: 'Ba(OH)2', vi: 'Bari hiđroxit' },
  { q: 'barium nitrate', f: 'Ba(NO3)2', vi: 'Bari nitrat' },
  // Vàng
  { q: 'gold(III) chloride', f: 'AuCl3', vi: 'Vàng(III) clorua' },
  { q: 'chloroauric acid', f: 'HAuCl4', vi: 'Axit cloroauric' },
  { q: 'gold(I) chloride', f: 'AuCl', vi: 'Vàng(I) clorua' },
  { q: 'gold(III) oxide', f: 'Au2O3', vi: 'Vàng(III) oxit' },
  { q: 'potassium dicyanoaurate', f: 'KAu(CN)2', vi: 'Kali đixianoaurat' },
  // Thuỷ ngân
  { q: 'mercuric oxide', f: 'HgO', vi: 'Thuỷ ngân(II) oxit' },
  { q: 'mercuric chloride', f: 'HgCl2', vi: 'Thuỷ ngân(II) clorua' },
  { q: 'calomel', f: 'Hg2Cl2', vi: 'Thuỷ ngân(I) clorua (calomen)' },
  { q: 'mercuric sulfide', f: 'HgS', vi: 'Thuỷ ngân(II) sunfua (chu sa)' },
  { q: 'dimethylmercury', f: 'C2H6Hg', vi: 'Đimetyl thuỷ ngân' },
  // Chì
  { q: 'lead(II) oxide', f: 'PbO', vi: 'Chì(II) oxit' },
  { q: 'lead(II) sulfide', f: 'PbS', vi: 'Chì(II) sunfua' },
  { q: 'lead(II) nitrate', f: 'Pb(NO3)2', vi: 'Chì(II) nitrat' },
  { q: 'lead(II) chloride', f: 'PbCl2', vi: 'Chì(II) clorua' },
  { q: 'lead(II) iodide', f: 'PbI2', vi: 'Chì(II) iotua' },
  { q: 'lead dioxide', f: 'PbO2', vi: 'Chì(IV) oxit' },
  // Bổ sung cho phòng thí nghiệm ảo (curated/reactions)
  { q: 'ferrous hydroxide', f: 'Fe(OH)2', vi: 'Sắt(II) hiđroxit' },
  { q: 'ferric hydroxide', f: 'Fe(OH)3', vi: 'Sắt(III) hiđroxit' },
  { q: 'ferric sulfate', f: 'Fe2(SO4)3', vi: 'Sắt(III) sunfat' },
  { q: 'ferric thiocyanate', f: 'Fe(SCN)3', vi: 'Sắt(III) thioxianat' },
  { q: 'potassium thiocyanate', f: 'KSCN', vi: 'Kali thioxianat' },
  { q: 'potassium sulfate', f: 'K2SO4', vi: 'Kali sunfat' },
  { q: 'potassium manganate', f: 'K2MnO4', vi: 'Kali manganat' },
  { q: 'sodium aluminate', f: 'NaAlO2', vi: 'Natri aluminat' },
  { q: 'carbonic acid', f: 'H2CO3', vi: 'Axit cacbonic' },
  { q: 'barium hydroxide octahydrate', f: 'Ba(OH)2*8H2O', vi: 'Bari hiđroxit ngậm 8 nước' },
];
