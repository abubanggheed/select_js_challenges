
const breakNode = (n = 0) => {
  console.log('callbacks queued:', n)
  setImmediate(() => {
    throw 'this madness must stop'
  })
  process.nextTick(breakNode, n + 1)
}

breakNode()
