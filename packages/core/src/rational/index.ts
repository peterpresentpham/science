/** Số hữu tỉ chính xác trên BigInt: cân bằng phương trình không bị sai số dấu phẩy động. */

export const gcd = (a: bigint, b: bigint): bigint => {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) [x, y] = [y, x % y];
  return x;
};
export const lcm = (a: bigint, b: bigint): bigint =>
  a === 0n || b === 0n ? 0n : (a / gcd(a, b)) * b;

export class Q {
  private constructor(
    readonly n: bigint,
    readonly d: bigint
  ) {}

  static of(n: bigint | number, d: bigint | number = 1n): Q {
    let N = BigInt(n);
    let D = BigInt(d);
    if (D === 0n) throw new RangeError('division by zero');
    if (D < 0n) {
      N = -N;
      D = -D;
    }
    const g = gcd(N, D) || 1n;
    return new Q(N / g, D / g);
  }

  static readonly ZERO = Q.of(0);
  static readonly ONE = Q.of(1);

  add(o: Q) {
    return Q.of(this.n * o.d + o.n * this.d, this.d * o.d);
  }
  sub(o: Q) {
    return Q.of(this.n * o.d - o.n * this.d, this.d * o.d);
  }
  mul(o: Q) {
    return Q.of(this.n * o.n, this.d * o.d);
  }
  div(o: Q) {
    if (o.n === 0n) throw new RangeError('division by zero');
    return Q.of(this.n * o.d, this.d * o.n);
  }
  neg() {
    return Q.of(-this.n, this.d);
  }
  isZero() {
    return this.n === 0n;
  }
  isInteger() {
    return this.d === 1n;
  }
  sign() {
    return this.n === 0n ? 0 : this.n > 0n ? 1 : -1;
  }
  eq(o: Q) {
    return this.n === o.n && this.d === o.d;
  }
  toNumber() {
    return Number(this.n) / Number(this.d);
  }
  /** "3", "-2", "8/3" */
  toString() {
    return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`;
  }
}
