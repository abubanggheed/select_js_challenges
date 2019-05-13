
function productOfArray(arrayIn) {
  let a = arrayIn[0] || 0
  let i = 1
  let product = 0
  while(a == a) { // see onelineisnan.js
    product = a
    a = a * arrayIn[i]
    i++
  }
  return product
}
