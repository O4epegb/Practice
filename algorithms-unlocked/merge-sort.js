function mergeSortedArrays(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.legnth || j < b.length) {
    if (b[j] !== undefined &&  a[i] <= b[j]) {
      result.push(a[i])
      i++
    } else {
      result.push(b[j]);
      j++
    }
  }
  return result;
}

console.log(mergeSortedArrays([0,1,4,7,8],[0,6, 10, 14, 15, 16, 16, 17]));
