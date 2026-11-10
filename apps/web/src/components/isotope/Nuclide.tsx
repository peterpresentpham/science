/** Ký hiệu hạt nhân: số khối viết nhỏ trên ký hiệu, vd. ¹⁴C. */
export function Nuclide({ a, symbol }: { a: number; symbol: string }) {
  return (
    <span className="whitespace-nowrap">
      <sup className="text-[0.7em]">{a}</sup>
      {symbol}
    </span>
  );
}
