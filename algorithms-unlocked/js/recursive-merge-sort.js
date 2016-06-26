function mergeSort(array) {
  if (array.length === 1) {
    return array;
  } else {
    var middle = Math.floor(array.length / 2);
    return mergeSortedArrays(
      mergeSort(array.slice(0, middle)),
      mergeSort(array.slice(middle))
    );
  }
}

const arr = [2,7,3,1,8,6,5];
const nativeSortedArray = arr.slice().sort((a, b) => a - b);
const mergeSortedArray = mergeSort(arr.slice());

const _ = require('lodash');

const arraysAreEqual = _.isEqual(nativeSortedArray, mergeSortedArray);

console.log(nativeSortedArray, mergeSortedArray);
console.log('Two arrays are equal:', arraysAreEqual)
console.assert(arraysAreEqual);

function mergeSortedArrays(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.length || j < b.length) {
    if (b[j] === undefined ||  a[i] <= b[j]) {
      result.push(a[i])
      i++
    } else {
      result.push(b[j]);
      j++
    }
  }
  return result;
}
