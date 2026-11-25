// The opening ("The Origin") and the hero orb share one live object: the
// opening's GSAP timeline writes these numbers, the orb's render loop reads
// them every frame. No React state, so nothing re-renders 60 times a second.
export const opening = {
  active: false, // while true the orb draws the particle swarm and reads the values below
  point: 0, // the luminous seed at the centre (0..1)
  form: 0, // particles: 0 = gathered in the seed, 1 = settled on the shell
  dust: 0, // particle opacity (0..1)
  reveal: 1, // the sphere's own light, rim first then the film (1 = the hero's orb)
  wave: -1, // energy wave across the sphere (0..1); below 0 = none
  scale: 1, // apparent size; 1 = the hero's exact framing
};

// The hero's resting values: where every opening ends, and what skipping jumps to.
export const HERO = {
  point: 0,
  form: 1,
  dust: 0,
  reveal: 1,
  wave: -1,
  scale: 1,
} as const;

// Where the opening starts: darkness. The orb takes this state from its very
// first frame when the opening is due, so the hero's orb never flashes first.
export const START = {
  point: 0,
  form: 0,
  dust: 0,
  reveal: 0,
  wave: -1,
  scale: 0.62,
} as const;

// Set by the orb: compiled once its shaders link, ready after its first frame,
// failed when WebGL is not there. The opening's counter reads the first two.
export const orbStatus = { compiled: false, ready: false, failed: false };

// Resolves true once the orb has drawn, false if it failed or took too long.
// 3s: the compile no longer blocks, so this clock starts before it ends; the <head>
// guard (also 3s from page start) is what really bounds the wait.
export function whenOrbReady(timeout = 3000) {
  return new Promise<boolean>((resolve) => {
    const t0 = performance.now();
    const check = () => {
      if (orbStatus.ready) return resolve(true);
      if (orbStatus.failed || performance.now() - t0 > timeout) return resolve(false);
      setTimeout(check, 50);
    };
    check();
  });
}
