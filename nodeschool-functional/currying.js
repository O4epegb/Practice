function curryN(fn, n) {
    n = n || fn.length
    function curry(fn, n, args) {
        args = args || [];
        return function(arg) {
            if (n <= 1) {
                return fn.apply(fn, args.concat(arg))
            }
            return curry(fn, n-1, args.concat(arg));
        }
    }
    return curry(fn, n)
}

function curryN(fn, n) {
    n = n || fn.length
    return function curriedN(arg) {
    if (n <= 1) return fn(arg)
    return curryN(fn.bind(this, arg), n - 1)
    }
}

module.exports = curryN