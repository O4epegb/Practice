var fs = require('fs');
var http = require('http');
var url = require('url');

var port = process.argv[2];

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);

  if (/parsetime/.test(parsedUrl.pathname) && parsedUrl.query.iso) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var date = new Date(parsedUrl.query.iso);
    var result = {};
    result.hour = date.getHours();
    result.minute = date.getMinutes();
    result.second = date.getSeconds();
    return res.end(JSON.stringify(result));
  } else if (/unixtime/.test(parsedUrl.pathname) && parsedUrl.query.iso) {
    var date = new Date(parsedUrl.query.iso);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({unixtime : date.getTime()}));
  } else {
    res.writeHead(200, { 'content-type': 'text/plain' });
    return res.end('Wrong request. Try again.');
  }
})

server.listen(port)



// var http = require('http')
// var url = require('url')

// function parsetime (time) {
//  return {
//    hour: time.getHours(),
//    minute: time.getMinutes(),
//    second: time.getSeconds()
//  }
// }

// function unixtime (time) {
//  return { unixtime : time.getTime() }
// }

// var server = http.createServer(function (req, res) {
//   var parsedUrl = url.parse(req.url, true)
//   var time = new Date(parsedUrl.query.iso)
//   var result

//   if (/^\/api\/parsetime/.test(req.url))
//    result = parsetime(time)
//   else if (/^\/api\/unixtime/.test(req.url))
//    result = unixtime(time)

//   if (result) {
//    res.writeHead(200, { 'Content-Type': 'application/json' })
//    res.end(JSON.stringify(result))
//   } else {
//    res.writeHead(404)
//    res.end()
//   }
// })

// server.listen(Number(process.argv[2]))
