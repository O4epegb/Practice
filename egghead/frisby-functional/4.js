const fs = require('fs');

const Right = x => ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inpect: () => `Right(${x})`
});

const Left = x => ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inpect: () => `Left(${x})`
});

const tryCatch = f => {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
}

const getPort = () =>
    tryCatch(() => fs.readFileSync('_test-config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000,
          c => c.port);

const result = getPort();

console.log(result);
