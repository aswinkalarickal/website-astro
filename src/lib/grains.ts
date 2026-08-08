export interface Grain {
  x: number;
  y: number;
  size: number;
}

/**
 * Scatters `count` points inside a circle of `maxRadius` (in the same
 * percentage units as `x`/`y`, centered at 50/50) using the golden angle,
 * giving an even, organic-looking distribution without true randomness.
 */
export function phyllotaxis(count: number, maxRadius: number): Grain[] {
  const goldenAngle = 137.50776;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i * goldenAngle * Math.PI) / 180;
    const radius = Math.sqrt((i + 0.5) / count) * maxRadius;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
      size: 0,
    };
  });
}
