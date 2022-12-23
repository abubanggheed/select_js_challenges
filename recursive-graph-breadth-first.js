const graphBreadthFirsting = (G, u, visit) => {
  visit(u)
  G.Adj[u.id].forEach(v => {
    v.color || (
      v.color = -1,
      v.d = u.d + 1,
      v.π = u,
      queueMicrotask(() => graphBreadthFirsting(G, v, visit))
    )
  })
  u.color = 1
}

const graphBreadthFirst = (G, s, visit) => new Promise(resolve => {
  // set everything in a check task to isolate this function from others operating on the graph
  setImmediate(() => {
    setImmediate(resolve)
    G.V.forEach(u => {
      u.color = 0
      u.d = Infinity
    })
    s.color = -1
    s.d = 0
    s.π = null
    // microtasks always have priority
    queueMicrotask(() => graphBreadthFirsting(G, s, visit))
  })
})
