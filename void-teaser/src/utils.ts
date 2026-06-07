// Deterministic PRNG so the starfield is identical on every render frame.
export const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export type Star = {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number; // 0 = far (slow parallax), 1 = near (fast)
};

export const makeStars = (count: number, seed: number): Star[] => {
  const rand = mulberry32(seed);
  return new Array(count).fill(0).map(() => ({
    x: rand() * 100,
    y: rand() * 100,
    size: 0.5 + rand() * 2.2,
    baseOpacity: 0.2 + rand() * 0.8,
    twinkleSpeed: 0.5 + rand() * 2,
    twinklePhase: rand() * Math.PI * 2,
    depth: rand(),
  }));
};
