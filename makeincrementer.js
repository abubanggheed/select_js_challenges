
const makeIncrementer = (n, threshold = 1) => () => (n++, n >= threshold)
