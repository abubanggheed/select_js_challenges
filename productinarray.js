/*
This function takes an array and a start index and will return
the product of all numbers starting from that index until
it reaches the end of the array or a non number (allowing type coersion).
If there are no numbers to multiply, it returns 0.
*/
function productInArray(arrayIn, startIndex = 0) {
  let product = 0
  for (
    let i = startIndex + 1, a = arrayIn[startIndex] * 1 || 0;
    product = a, a = a * arrayIn[i], a === a;
    i++
  ) { }
    return product
}
