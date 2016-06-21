function binarySearch(array, x) {
  let left = 0;
  let right = array.length - 1;
  let middle;

  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (array[middle] === x) {
      return middle;
    } else if (array[middle] > x) {
      right = middle - 1;
    } else if (array[middle] < x) {
      left = middle + 1;
    }
  }

  return;
}

const arr = [1,4,6,7,13,24,55];

console.log(binarySearch(arr, 24));
console.assert(binarySearch(arr, 24) === 5);
