var request = require('request');
var fs = require('fs');

var button = document.querySelector('.test');
var input = document.querySelector('input');
var textDiv = document.querySelector('.text');

// button.addEventListener('click', e => {
//     var filepath = input.value;
//     fs.exists(filepath, function(exists) {
//         if (exists) {
//             readFile(filepath).then(content => {
//               textDiv.textContent = content;
//             });
//         } else {
//             alert("This file doesn't exist, cannot delete");
//         }
//     });
// });

function readFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function downloadFile(file_url , targetPath){
    // Save variable to know progress
    var received_bytes = 0;
    var total_bytes = 0;

    var req = request({
        method: 'GET',
        uri: file_url
    });

    req.on('error', function(error) {
      console.log(error);
    });

    var out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('response', function ( data ) {
        // Change the total bytes value to get progress later.
        total_bytes = parseInt(data.headers['content-length' ]);
    });

    req.on('data', function(chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes);
    });

    req.on('end', function() {
        alert("File succesfully downloaded");
    });


}

function showProgress(received,total){
    var percentage = (received * 100) / total;
    textDiv.textContent = textDiv.textContent + '\n' + (percentage + "% | " + received + " bytes out of " + total + " bytes.");
}

// var fileURL = "http://www.planwallpaper.com/static/images/";
var fileURL = "http://www.planwallpaper.com/static/images/butterfly-wallpaper.jpeg";
var filename = getFilenameFromUrl(fileURL);
var downloadsFolder = "E:\\";

function getFilenameFromUrl(url){
    return url.substring(url.lastIndexOf('/') + 1);
}

var finalPath = downloadsFolder + "\\" + filename;


button.addEventListener('click', e => {
    downloadFile(fileURL, finalPath);
});
