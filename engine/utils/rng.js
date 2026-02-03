export function createSeededRNG(seed) {
  let state = seed >>> 0; // force unsigned 32-bit

  return function random() {
    // LCG parameters (Numerical Recipes)
    state = (1664525 * state + 1013904223) >>> 0;

    // Normalize to (0, 1)
    return state / 2 ** 32;
  };
}

/* test
const rng1 = createSeededRNG(10);
const rng2 = createSeededRNG(10);

console.log(rng1(), rng1(), rng1());
console.log(rng2(), rng2(), rng2());
*/