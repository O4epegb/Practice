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

function mergeSortedArrays(
    xs: Array<number>,
    ys: Array<number>
): Array<number> {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < xs.length || j < ys.length) {
        if (ys[j] === undefined || xs[i] <= ys[j]) {
            result.push(xs[i]);
            i++;
        } else {
            result.push(ys[j]);
            j++;
        }
    }
    return result;
}

// More elegant merge implementation
function merge(xs: Array<number>, ys: Array<number>): Array<number> {
    if (xs.length === 0) {
        return ys;
    }
    if (ys.length === 0) {
        return xs;
    }
    const x = xs[0];
    const y = ys[0];
    return x < y
        ? [x, ...merge(xs.slice(1), ys)]
        : [y, ...merge(xs, ys.slice(1))];
}
