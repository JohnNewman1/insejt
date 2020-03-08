//alert('Grrr.')
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const re = new RegExp('bear', 'gi')
//   const matches = document.documentElement.innerHTML.match(re)
//   sendResponse({count: matches.length})
// })
const time = 10;
const y = {
    url: window.location.href,
    time: time,
};

chrome.runtime.sendMessage(y);
