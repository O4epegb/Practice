export function mutatedSwap(
    firstIndex: number,
    secondIndex: number,
    array: Array<number>
) {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}
