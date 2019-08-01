
const determinant = sqrMat => (
  sqrMat.length > 1 ?
  sqrMat[0].reduce( (prev, cur, i) => (
    prev + cur * Math.pow(-1, i) * determinant(
      sqrMat.slice(1).map(row => (
        row.slice(1).map(
          (entry, j) => row[(i + j + 1) % row.length]
        )
      ))
    )
  ), 0): sqrMat[0][0]
)
