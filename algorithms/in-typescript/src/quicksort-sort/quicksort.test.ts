import quicksort from './recursive-quick-sort';

it('quicksort is working', () => {
    const arr = [2, 1, 7, 3, 9, 8, 6, 5];
    const nativeSortedArray = arr.slice().sort((a, b) => a - b);

    expect(quicksort(arr)).toEqual(nativeSortedArray);
});
