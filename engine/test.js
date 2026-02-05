import { straddlePayoff } from "./strategies/straddle.js";
import { failureProbability } from "./utils/stats.js";

// Simple payoff checks
console.log(straddlePayoff(100, 100, 10)); // -10
console.log(straddlePayoff(120, 100, 10)); // +10
console.log(straddlePayoff(80, 100, 10));  // +10

// Failure probability check
const payoffs = [-10, -5, 0, 10, 20];
console.log(failureProbability(payoffs)); // 0.4
