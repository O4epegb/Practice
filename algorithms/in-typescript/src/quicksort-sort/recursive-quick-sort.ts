export default function quickSort(array, left, right) {
    if (array.length === 1) {
        return;
    } else {
        const anchor = array[array.length - 1];
        const anchorPoint = partition(array, left, right);
        quickSort(array, left, anchorPoint - 1);
        quickSort(array, anchorPoint + 1, right);
    }
}

function partition(array, left, right): any {

}
