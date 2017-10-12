export default function selectionSort(array: Array<number>): Array<number> {
    let smallest;
    array = array.slice();
    const arrayLength = array.length;

    for (let i = 0; i < arrayLength; i++) {
        smallest = array[i];

        for (let j = i + 1; j < arrayLength; j++) {
            if (array[j] < smallest) {
                smallest = array[j];
                mutatedSwap(i, j, array);
            }
        }
    }

    return array;
}

function mutatedSwap(
    firstIndex: number,
    secondIndex: number,
    array: Array<number>
) {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}
