import { mutatedSwap } from '../utils';

export default function bubbleSort(array: Array<number>): Array<number> {
    const arrayLength = array.length;

    for (let i = 0; i < arrayLength; i++) {
        for (let j = 0; j < arrayLength - 1; j++) {
            if (array[j] > array[j + 1]) {
                mutatedSwap(j, j + 1, array);
            }
        }
    }

    return array;
}
