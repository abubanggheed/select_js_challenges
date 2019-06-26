/*
This function takes an array and a start index and will return
the product of all numbers starting from that index untill
it reaches the end of the array or a non number.
If there are no numbers to multiply, it returns 0.
*/
function productInArray(arrayIn, startIndex = 0) {
  let a = arrayIn[startIndex] || 0
  let i = startIndex + 1
  let product = 0
  while(a === a) {
    product = a
    a = a * arrayIn[i]
    i++
  }
  return product
}
