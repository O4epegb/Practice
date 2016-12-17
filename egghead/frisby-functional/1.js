const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inpect: () => `Box(${x})`
});

const nextCharFromString = str =>
    Box(str)
    .map(s => s.trim())
    .map(s => new Number(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())

const result = nextCharFromString('  64 ');

console.log(result);
