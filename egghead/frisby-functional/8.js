const Sum = x => ({
    x,
    concat: ({x: y}) =>
        Sum(x + y),
    inspect: () => `Sum(${x})`
});

// is monoid
Sum.empty = () => Sum(0)

const All = x => ({
    x,
    concat: ({x: y}) =>
        All(x && y),
    inspect: () => `All(${x})`
});

// is monoid
All.empty = () => All(true)

// not monoid, there is no starting element
const First = x => ({
    x,
    concat: _ =>
        First(x),
    inspect: () => `First(${x})`
});

const sum = xs =>
    xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
    xs.reduce((acc, x) => acc && x, true)

// will throw on empty list, because there is nothing to start from
const sum = xs =>
    xs.reduce((acc, x) => acc)
