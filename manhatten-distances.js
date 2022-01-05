const processCoordinate = (coordinates, distances) => {
  let [x, y] = coordinates
  let d = distances[x][y]
  [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(coords => {
    let [dx, dy] = coords
    if (dx < 0 || dx > distances.length) return false
    if (dy < 0 || dy > distances[0].length) return false
    return distances[dx][dy] === null
  }).forEach(nullPoint => {
    distances[nullPoint[0]][nullPoint[1]] = d + 1
    queueMicrotask(() => processCoordinate(nullPoint, distances))
  })
}

const manhattenDistances = binaryImage => new Promise(resolve => {
  setImmediate(() => {
    const distances = binaryImage.map((row, x) => row.map((bit, y) => (
      bit ? (queueMicrotask(() => processCoordinate([x, y], distances)), 0) : null
    )))
    setImmediate(resolve, distances)
  })
})
