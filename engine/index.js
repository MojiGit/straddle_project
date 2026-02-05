/*
It must:
    1.Build volatility scenarios
    2.Ensure same randomness across scenarios
    3.Produce a stable, UI-ready output
    4.Hide implementation details from the app
*/

// engine/index.js

import { createSeededRNG } from "./utils/rng.js";
import { sampleTerminalPrices } from "./distributions/lognormal.js";
import { straddlePayoff } from "./strategies/straddle.js";
import { failureProbability } from "./utils/stats.js";

const N_SIMULATIONS = 10_000;
const DEFAULT_SEED = 12345;

export function runStraddleSimulation({
  spot,
  strike,
  premium,
  timeToExpiry,
  volatility
}) {
  // 1. Breakevens
  const breakevens = {
    lower: strike - premium,
    upper: strike + premium
  };

  // 2. Volatility scenarios
  const scenarios = {
    low: volatility * 0.8,
    base: volatility,
    high: volatility * 1.2
  };

  const failureResults = {};
  let basePrices = [];
  let basePayoffs = [];

  // 3. Run scenarios
  for (const [label, vol] of Object.entries(scenarios)) {
    const rng = createSeededRNG(DEFAULT_SEED);

    const prices = sampleTerminalPrices({
      spot,
      volatility: vol,
      timeToExpiry,
      nSimulations: N_SIMULATIONS,
      rng
    });

    const payoffs = prices.map(ST =>
      straddlePayoff(ST, strike, premium)
    );

    failureResults[label] = failureProbability(payoffs);

    // Store base scenario distribution for charts / reports
    if (label === "base") {
      basePrices = prices;
      basePayoffs = payoffs;
    }
  }

  // 4. Final output
  return {
    breakevens,
    failureProbability: failureResults,
    pnl: {
      prices: basePrices,
      payoffs: basePayoffs
    }
  };
}

