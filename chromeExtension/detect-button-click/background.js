chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.directive) {
        console.log(request, sender);
        chrome.tabs.create({
            url: 'file:///E:/Projects/Practice/chromeExtension/index.html'
        }, function(tab) {
            console.log('tab created!', tab);
            chrome.tabs.executeScript(tab.id, {
                file: "trackingscript.js", // script to inject into page and run in sandbox
            }, function() {
                chrome.tabs.sendMessage(tab.id, {
                    text: "report_back",
                    test: tab.id
                });
            });
        });
        sendResponse({}); // sending back empty response to sender
        return;
    }
    if (request.linkId) {
        console.log('linkId', request.linkId)
        return;
    }
    console.log("Unmatched request", request, sender);
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     // console.log('Tab updated')
//     // console.log(tab, changeInfo)
//     if (tab.url.match(/Practice\/chromeExtension/)) {
//         chrome.tabs.executeScript(tab.id, {
//             file: "linkhighlighter.js", // script to inject into page and run in sandbox
//         });
//     }
// })

// chrome.tabs.onCreated.addListener(function(tab) {
//   chrome.tabs.executeScript(tab.id, {
//       file: "linkhighlighter.js", // script to inject into page and run in sandbox
//   });
// })

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(changeInfo)
    if (changeInfo.url && tab.url.match(/Practice\/chromeExtension/)) {
      chrome.tabs.executeScript(tab.id, {
          file: "linkhighlighter.js", // script to inject into page and run in sandbox
      });
        console.log('sending relink message')
        chrome.tabs.sendMessage(tab.id, {relink: 'relink'});
    }
})
