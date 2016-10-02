module.exports = function (request, response, next) {
  var start = Number(new Date());
  var stream = process.stdout;
  var url = request.url;
  var method = request.method;

  response.on('finish', function () {
    var duration = Number(new Date()) - start;
    var message = method + ' to "' + url + '" took ' + duration + ' ms\n';
    stream.write(message);
  });

  next();
}
