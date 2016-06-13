function Spy(target, method) {
  var number = 0;
  var targetMethod = target[method];
  target[method] = function() {
    number++
    targetMethod.apply(null, arguments);
  }
  return {
      get count() {
        return number;
    }
  }
}


module.exports = Spy
