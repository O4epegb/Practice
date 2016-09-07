import insertionSort from './insertion-sort';

it('insertion sort is working', () => {
    const arr = [2, 1, 7, 3, 9, 8, 6, 5];
    const nativeSortedArray = arr.slice().sort((a, b) => a - b);

    expect(insertionSort(arr)).toEqual(nativeSortedArray);
});
