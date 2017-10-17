export default function binarySearch(array: Array<number>, x: number): number {
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

    return -1;
}
