chrome.runtime.onMessage.addListener(function (y) {
    chrome.storage.sync.get(['insejt'], function(result) {
        if (Object.keys(result).length === 0) {
            result = {
                insejt: [],
            }
        }
        let v = result.insejt;
        v.push(y);
        chrome.storage.sync.set({
            insejt: v,
        });
        console.log(v);
    });
})

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({url: 'popup.html'})
})

