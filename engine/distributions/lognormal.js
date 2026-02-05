function standardNormal(rng){
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = rng(); // Convert [0,1) to (0,1)
    while (u2 === 0) u2 = rng();

    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
};

export function sampleTerminalPrices({
    spot,
    volatility,
    timeToExpiry,
    nSimulations,
    rng
}) {
    const prices = [];

    const drift = -0.5 * volatility * volatility * timeToExpiry;
    const diffusionCoefficient = volatility * Math.sqrt(timeToExpiry);

    for (let i = 0; i < nSimulations; i++) {
        const z = standardNormal(rng);
        prices.push(spot * Math.exp(drift + diffusionCoefficient * z));
    }
    return prices;
}




