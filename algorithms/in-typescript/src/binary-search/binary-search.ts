export default function binarySearch(array: Array<number>, x: number): number {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        const middleValue = array[middle];

        if (middleValue > x) {
            right = middle - 1;
        } else if (middleValue < x) {
            left = middle + 1;
        } else {
            return middle;
        }
    }

    return -1;
}
