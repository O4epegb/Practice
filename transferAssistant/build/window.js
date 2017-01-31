var path = require('path');
var notifier = require('node-notifier');
var robot = require('robotjs');

var options = [
  {
    title: "Basic Notification",
    body: "Short message part"
  },
  {
    title: "Content-Image Notification",
    body: "Short message plus a custom content image",
    icon: path.join(__dirname, 'icon.png')
  }
]

function doNotify(evt) {
    robot.moveMouse(100, 100);
  if (evt.srcElement.id == "basic") {
    new Notification(options[0].title, options[0]);
  }
  else if (evt.srcElement.id == "image") {
    new Notification(options[1].title, options[1]);
  }
}

notifier.notify({
    title: 'My awesome title',
    message: 'Hello from node, Mr. User!',
    sound: true, // Only Notification Center or Windows Toasters
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("basic").addEventListener("click", doNotify);
  document.getElementById("image").addEventListener("click", doNotify);
})
