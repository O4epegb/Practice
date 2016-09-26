export default function mergeSort(array: Array<number>): Array<number> {
    if (array.length === 1) {
        return array;
    } else {
        const middle = Math.floor(array.length / 2);
        return mergeSortedArrays(
            mergeSort(array.slice(0, middle)),
            mergeSort(array.slice(middle))
        );
    }
}

function mergeSortedArrays(a: Array<number>, b: Array<number>): Array<number> {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < a.length || j < b.length) {
        if (b[j] === undefined || a[i] <= b[j]) {
            result.push(a[i]);
            i++;
        } else {
            result.push(b[j]);
            j++;
        }
    }
    return result;
}

// More elegant merge implementation
function merge(xs, ys) {
    if (xs.length === 0) return ys;
    if (ys.length === 0) return xs;
    const x = xs[0];
    const y = ys[0];
    return (x < y) ?
        [x, ...merge(xs.slice(1), ys)] :
        [y, ...merge(xs, ys.slice(1))];
}
