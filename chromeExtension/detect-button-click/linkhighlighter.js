console.log('link highlighter')

var link = document.getElementById('link');

function makeLink() {
  if (link) {
    link.style.color = 'red';

    link.removeEventListener('click', sendText)
    link.addEventListener('click', sendText);
  }
}

makeLink();

function sendText() {
  chrome.runtime.sendMessage({
      linkId: link.innerHTML
  }, function(response) {
    // console.log('message sent successfully');
  });
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.relink && (msg.relink == "relink")) {
        console.log('relink message recieved')
        makeLink()
    }
});
