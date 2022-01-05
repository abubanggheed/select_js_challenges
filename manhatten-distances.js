const processCoordinate = (coordinates, image, distances) => {
  let [x, y] = coordinates
  let d = distances[x][y]
  [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(coords => {
    let [dx, dy] = coords
    if (dx < 0 || dx > image.length) return false
    if (dy < 0 || dy > image[0].length) return false
    return image[dx][dy] === null
  }).forEach(nullPoint => {
    distances[nullPoint[0]][nullPoint[1]] = d + 1
    queueMicrotask(() => processCoordinate(nullPoint, image, distances))
  })
}

const manhattenDistances = binaryImage => new Promise(resolve => {
  setImmediate(() => {
    const distances = binaryImage.map((row, x) => row.map((bit, y) => (
      bit ? (queueMicrotask(() => processCoordinate([x, y], binaryImage, distances)), 0) : null
    )))
    setImmediate(resolve, distances)
  })
})
