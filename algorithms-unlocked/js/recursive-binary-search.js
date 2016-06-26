function binarySearch(array, x, leftIndex, rightIndex) {
  const left = leftIndex || 0;
  const right = rightIndex || array.length - 1;
  const middle = Math.floor((left + right) / 2);
  if (array[middle] === x) {
    return middle;
  } else if (array[middle] > x) {
    return binarySearch(array, x, left, middle - 1);
  } else if (array[middle] < x) {
    return binarySearch(array, x, middle + 1, right);
  }

  return;
}

const arr = [1,4,6,7,13,24,55];

console.log(binarySearch(arr, 24));
console.assert(binarySearch(arr, 24) === 5);
