export default function quickSort(array: Array<number>): Array<number> {
    if (array.length < 2) {
        return array;
    }

    const pivotIndex = Math.ceil(array.length / 2);
    const pivot = array[pivotIndex];

    const less: Array<number> = [];
    const greater: Array<number> = [];

    for (let index = 0; index < array.length; index++) {
        if (index === pivotIndex) {
            continue;
        }

        const element = array[index];
        (element <= pivot ? less : greater).push(element);
    }

    return [...quickSort(less), pivot, ...quickSort(greater)];
}
