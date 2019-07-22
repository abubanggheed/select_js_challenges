
const compose = (f, g) => (...args) => f(g(...args))

const composeAll = (...args) => args.reduceRight(
  (g, f) => g ? (...yargs) => f(g(...yargs))
  : (...yargs) => f(...yargs)
)
