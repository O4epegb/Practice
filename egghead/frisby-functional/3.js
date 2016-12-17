const Right = x => ({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inpect: () => `Right(${x})`
});

const Left = x => ({
    map: f => Left(x),
    fold: (f, g) => f(x),
    inpect: () => `Left(${x})`
});

const fromNullable = x =>
    x != null ? Right(x) : Left(null)

const findColor = name =>
    fromNullable({red: '#ff4444', blue: '#3b5998'}[name])

const result = findColor('blue')
                .map(c => c.slice(1))
                .fold(e => 'no color',
                      c => c.toUpperCase())

console.log(result);
