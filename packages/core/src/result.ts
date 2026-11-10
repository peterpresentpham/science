/** Kết quả có cấu trúc thay cho throw, để giao diện hiện lỗi đúng chỗ (xem docs: quy ước code). */
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
