'use strict';

var axon = require('axon');
var socket = axon.socket('sub');

socket.connect(8001, '127.0.0.1');

socket.on('error', function (err) {
  throw err;
})

module.exports = socket;
