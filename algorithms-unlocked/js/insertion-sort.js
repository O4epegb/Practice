function insertionSort(array) {
  array = array.slice();
  const arrayLength = array.length;

  for (let i = 0; i < arrayLength; i++) {
    let key = array[i];
    let j = i - 1;

    while(j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--
    }

    array[j + 1] = key;
  }

  return array;
}

const arr = [2,1,7,3,9,8,6,5];
const nativeSortedArray = arr.slice().sort((a, b) => a - b);
const insertionSortedArray = insertionSort(arr.slice());

const _ = require('lodash');

const arraysAreEqual = _.isEqual(nativeSortedArray, insertionSortedArray);

console.log(nativeSortedArray, insertionSortedArray);
console.log('Two arrays are equal:', arraysAreEqual)
console.assert(arraysAreEqual);
