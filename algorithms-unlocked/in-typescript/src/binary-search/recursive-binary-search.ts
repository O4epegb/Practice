export default function recursiveBinarySearch(array, x) {
    function iter(array, x, leftIndex, rightIndex) {
        const left = leftIndex;
        const right = rightIndex;
        const middle = Math.floor((left + right) / 2);
        if (left > right) {
            return -1;
        }
        if (array[middle] === x) {
            return middle;
        } else if (array[middle] > x) {
            return iter(array, x, left, middle - 1);
        } else if (array[middle] < x) {
            return iter(array, x, middle + 1, right);
        }
    }
    return iter(array, x, 0, array.length - 1);
}
