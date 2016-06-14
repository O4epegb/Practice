var fs = require('fs');

var path = process.argv[2];
var ext = process.argv[3]

var mymodule = require('./module.js')

function callback(err, list) {
  if (err) {
   throw err;
  }
  else list.forEach(function (file) {
   console.log(file);
  })
}

mymodule(path, ext, callback);