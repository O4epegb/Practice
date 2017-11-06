import { mutatedSwap } from '../utils';

export default function selectionSort(array: Array<number>): Array<number> {
    const arrayLength = array.length;

    for (let i = 0; i < arrayLength; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arrayLength; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            mutatedSwap(i, minIndex, array);
        }
    }

    return array;
}
