
const compose = (f, g) => (...args) => f(g(...args))

const composeAll = (...args) => args.reduceRight(
  (g, f) => x => f(g(x)), x => x
)
