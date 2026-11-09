/** Hiển thị cấu hình electron với chỉ số trên thật: "[Ar] 3d6 4s2" → [Ar] 3d⁶ 4s² */
export function ConfigText({ config, className }: { config: string; className?: string }) {
  const parts = config.split(' ').filter(Boolean);
  return (
    <span className={`font-mono ${className ?? ''}`}>
      {parts.map((p, i) => {
        const m = p.match(/^(\d[spdf])(\d+)$/);
        return (
          <span key={p}>
            {i > 0 && ' '}
            {m ? (
              <>
                {m[1]}
                <sup className="ml-px text-[0.68em]">{m[2]}</sup>
              </>
            ) : (
              <span className="text-muted">{p}</span>
            )}
          </span>
        );
      })}
    </span>
  );
}
