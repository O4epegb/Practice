module.exports = function arrayMap(arr, fn) {
  return arr.reduce(function(prev, curr, i, array) {
    prev.push(fn(curr, i, array));
    return prev;
  }, [])
}
