var kek;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        console.log('tracking message recieved')
        kek = msg.test;
        test();
    }
});

function test() {
    setTimeout(function() {
        if (getOlolo()) {
            console.log('success', getOlolo(), kek)
        } else {
            console.log('fail', getOlolo(), kek)
            test()
        }
    }, 1000)
}

function getOlolo() {
  var el = document.getElementById('lol');
  if (el) {
    return el.innerHTML;
  }
}
