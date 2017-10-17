export default function insertionSort(array: Array<number>): Array<number> {
    array = array.slice();
    const arrayLength = array.length;

    for (let i = 0; i < arrayLength; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }

    return array;
}
