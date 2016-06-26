function selectionSort(array) {
  let smallest;
  array = array.slice();
  const arrayLength = array.length;

  for (let i = 0; i < arrayLength; i++) {
    smallest = array[i];

    for (let j = i + 1; j < arrayLength; j++) {
      if (array[j] < smallest) {
        smallest = array[j];
        swap(i, j, array)
      }
    }
  }

  function swap(i, j, array) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

const arr = [2,7,3,1,8,6,5];
const nativeSortedArray = arr.slice().sort((a, b) => a - b);
const selectionSortedArray = selectionSort(arr.slice());

const _ = require('lodash');

const arraysAreEqual = _.isEqual(nativeSortedArray, selectionSortedArray);

console.log(nativeSortedArray, selectionSortedArray);
console.log('Two arrays are equal:', arraysAreEqual)
console.assert(arraysAreEqual);
