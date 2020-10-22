
const fibCache = {}
const fibTotalCache = {}

const fibonacci = num => (
  !(+num > 0) ? 0 : +num === 1 ? 1 :
    fibCache[`${num}`] || (
      fibCache[`${num}`] = fibonacci(num - 1) + fibonacci(num - 2),
      fibCache[`${num}`]
    )
)

const fibonacciTotal = num => (
  !(+num > 0) ? 0 :
  fibTotalCache[`${num}`] || (
    fibTotalCache[`${num}`] = fibonacci(num) + fibonacciTotal(num - 1),
    fibTotalCache[`${num}`]
  )
)

console.log(fibonacciTotal(40))
