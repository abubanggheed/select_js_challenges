
const infinite = (n = 0) => {
  console.log('calls:', n)
  setImmediate(infinite, n + 1)
}

infinite()
