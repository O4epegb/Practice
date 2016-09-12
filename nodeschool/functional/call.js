function duckCount() {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(prev, curr) {
    return Object.prototype.hasOwnProperty.call(curr, 'quack') ?
      prev + 1 :
      prev;
  }, 0);
}

module.exports = duckCount
