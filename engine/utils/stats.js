export function failureProbability(payoffs) {
    let failures = 0;

    for (const pnl of payoffs) {
        if (pnl < 0) failures++;
    }

    return failures / payoffs.length;
}
