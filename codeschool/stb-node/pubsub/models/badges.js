'use strict';

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

exports.save = function (badges, callback) {
  if (!badges.length) return callback(null, null);
  var badge = badges.pop();
  redis.lpush('badges', JSON.stringify(badge), function (err) {
    if (err) return callback(err, null);
    exports.save(badges, callback);
  });
};

exports.send = function (badges, callback) {
  badges.forEach(broadcast.send);
  callback(null, null);
};

exports.get = function (callback) {
  redis.lrange('badges', 0, -1, function(err, data) {
    if (err) return callback(err, null);
    callback(null, data.map(JSON.parse));
  });
};

exports.trim = function () {
  redis.ltrim('badges', 0, 9);
};
