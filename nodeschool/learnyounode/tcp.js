var net = require('net');

function callback(socket) {
  var date = new Date();

  var year = date.getFullYear();
  var month = String(date.getMonth()).length > 1 ? Number(date.getMonth()) + 1 : "0" + (Number(date.getMonth()) + 1);
  var day = String(date.getDate()).length > 1 ? date.getDate() : "0" + date.getDate();
  var hour = String(date.getHours()).length > 1 ? Number(date.getHours()) : "0" + date.getHours();
  var minute = String(date.getMinutes()).length > 1 ? Number(date.getMinutes()) : "0" + date.getMinutes();

  var result = year + "-" + month + "-" + day + " " + hour + ":" + minute + '\n'

  socket.end(result)
}

var server = net.createServer(callback)

server.listen(process.argv[2])


// var net = require('net')
//     function zeroFill(i) {
//       return (i < 10 ? '0' : '') + i
//     }
//     function now () {
//       var d = new Date()
//       return d.getFullYear() + '-'
//         + zeroFill(d.getMonth() + 1) + '-'
//         + zeroFill(d.getDate()) + ' '
//         + zeroFill(d.getHours()) + ':'
//         + zeroFill(d.getMinutes())
//     }

//     var server = net.createServer(function (socket) {
//       socket.end(now() + '\n')
//     })

//     server.listen(Number(process.argv[2]))