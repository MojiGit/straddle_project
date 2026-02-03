/*{
  spot,          // current price (number)
  strike,        // strike price (number)
  premium,       // total premium paid (call + put)
  timeToExpiry,  // in years (e.g. 30/365)
  volatility     // annualized IV (e.g. 0.65)
}

{
  breakevens: {
    lower,
    upper
  },
  failureProbability: {
    low,
    base,
    high
  },
  pnl: {
    prices,   // terminal prices
    payoffs   // corresponding PNLs
  }
}
*/

straddlePayoff = (st, strike, premium) => {
  return Math.max(st - strike, 0) + Math.max(strike - st, 0) - premium; //this is assuming a total premium paid
}


