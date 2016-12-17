const Sum = x => ({
    x,
    concat: ({x: y}) =>
        Sum(x + y),
    inspect: () => `Sum(${x})`
});

const res1 = Sum(1).concat(Sum(2));
console.log(res1);

const All = x => ({
    x,
    concat: ({x: y}) =>
        All(x && y),
    inspect: () => `All(${x})`
});

const res2 = All(true).concat(All(false));
console.log(res2);

const First = x => ({
    x,
    concat: _ =>
        First(x),
    inspect: () => `First(${x})`
});

const res3 = First('first').concat(First('second'));
console.log(res3);
