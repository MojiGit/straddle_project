import { runStraddleSimulation } from "./index.js";

const result = runStraddleSimulation({
  spot: 100,
  strike: 100,
  premium: 10,
  timeToExpiry: 30 / 365,
  volatility: 0.6
});

console.log("Breakevens:", result.breakevens);
console.log("Failure probability:", result.failureProbability);
console.log("PNL samples:", result.pnl.payoffs.slice(0, 10));
