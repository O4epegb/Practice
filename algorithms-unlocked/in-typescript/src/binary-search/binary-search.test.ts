import binarySearch from './binary-search';
import recursiveBinarySearch from './recursive-binary-search';

describe('Binary serach is working', () => {
    it('iterative binary search is ok', () => {
        const arr = [1, 4, 6, 7, 13, 24, 55];

        expect(binarySearch(arr, 1)).toBe(0);
        expect(binarySearch(arr, 4)).toBe(1);
        expect(binarySearch(arr, 6)).toBe(2);
        expect(binarySearch(arr, 7)).toBe(3);
        expect(binarySearch(arr, 13)).toBe(4);
        expect(binarySearch(arr, 24)).toBe(5);
        expect(binarySearch(arr, 55)).toBe(6);
        expect(binarySearch(arr, -2)).toBe(-1);
        expect(binarySearch(arr, 777)).toBe(-1);
    });

    it('recursive binary search is ok', () => {
        const arr = [1, 4, 6, 7, 13, 24, 55];

        expect(recursiveBinarySearch(arr, 1)).toBe(0);
        expect(recursiveBinarySearch(arr, 4)).toBe(1);
        expect(recursiveBinarySearch(arr, 6)).toBe(2);
        expect(recursiveBinarySearch(arr, 7)).toBe(3);
        expect(recursiveBinarySearch(arr, 13)).toBe(4);
        expect(recursiveBinarySearch(arr, 24)).toBe(5);
        expect(recursiveBinarySearch(arr, 55)).toBe(6);
        expect(recursiveBinarySearch(arr, -2)).toBe(-1);
        expect(recursiveBinarySearch(arr, 777)).toBe(-1);
    });
});
