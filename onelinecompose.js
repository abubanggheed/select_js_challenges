
const compose = (f, g) => (...args) => f(g(...args))

const composeAll = (...args) => args.reduce(
  (g, f) => g ? (...yargs) => f(g(...yargs))
  : f
)
