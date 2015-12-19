var fs = require('fs');

module.exports = function func(path, ext, cb) {

  function callback(err, list) {
    var args = new RegExp('.' + ext);
    if (!err) {
      var filtered = list.filter(function(el) {
        return args.test(el);
      });
      return cb(null, filtered)
    } else if (err) {
      return cb(err);
    }
  }

  fs.readdir(path,callback)

}
