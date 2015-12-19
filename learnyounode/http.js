var http = require('http');

var all = [];
var count = 0


function printResults() {
    for (var i = 0; i < 3; i++)
        console.log(all[i])
}

function httpGet(index) {
    http.get(process.argv[2 + index], function(response) {
        var result = '';

        response.setEncoding('utf8')
        response.on("data", function(data) {
            result += data;
        })
        response.on("end", function() {
            all[index] = result;
            count++
            count === 3 ? printResults() : false
        })
    })
}

for (var i = 0; i < 3; i++) {
    httpGet(i)
}
