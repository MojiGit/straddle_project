import { createSeededRNG } from "./utils/rng.js";
import { sampleTerminalPrices } from "./distributions/lognormal.js";

// ---------- CONFIG ----------
const spot = 100;
const timeToExpiry = 30 / 365;
const nSimulations = 10_000;
const seed = 42;

// ---------- TEST 1: zero volatility ----------
{
  const rng = createSeededRNG(seed);

  const prices = sampleTerminalPrices({
    spot,
    volatility: 0,
    timeToExpiry,
    nSimulations,
    rng
  });

  const allEqual = prices.every(p => p === spot);

  console.log("TEST 1 — Zero volatility");
  console.log("All prices equal to spot:", allEqual);
}

// ---------- TEST 2: higher volatility = wider distribution ----------
{
  const rngLow = createSeededRNG(seed);
  const rngHigh = createSeededRNG(seed);

  const pricesLow = sampleTerminalPrices({
    spot,
    volatility: 0.3,
    timeToExpiry,
    nSimulations,
    rng: rngLow
  });

  const pricesHigh = sampleTerminalPrices({
    spot,
    volatility: 1.0,
    timeToExpiry,
    nSimulations,
    rng: rngHigh
  });

  const rangeLow = Math.max(...pricesLow) - Math.min(...pricesLow);
  const rangeHigh = Math.max(...pricesHigh) - Math.min(...pricesHigh);

  console.log("\nTEST 2 — Volatility effect");
  console.log("Low vol range:", rangeLow.toFixed(2));
  console.log("High vol range:", rangeHigh.toFixed(2));
  console.log("High vol wider:", rangeHigh > rangeLow);

  const avg = pricesHigh.reduce((a, b) => a + b, 0) / pricesHigh.length;

  console.log("Average terminal price:", avg.toFixed(2));
}

// ---------- TEST 3: reproducibility ----------
{
  const rng1 = createSeededRNG(seed);
  const rng2 = createSeededRNG(seed);

  const prices1 = sampleTerminalPrices({
    spot,
    volatility: 0.6,
    timeToExpiry,
    nSimulations: 5,
    rng: rng1
  });

  const prices2 = sampleTerminalPrices({
    spot,
    volatility: 0.6,
    timeToExpiry,
    nSimulations: 5,
    rng: rng2
  });

  const identical =
    prices1.every((p, i) => p === prices2[i]);

  console.log("\nTEST 3 — Reproducibility");
  console.log("Sequences identical:", identical);
  console.log("Prices:", prices1.map(p => p.toFixed(2)));
}
