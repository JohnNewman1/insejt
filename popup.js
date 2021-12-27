let checkHistory = document.getElementById("checkHistory");
console.log('running');

checkHistory.addEventListener("click", async () => {
  checkOutSomeHistory();

});

function checkOutSomeHistory() {
  var microsecondsPerDay= 1000 * 60 * 60 * 24;
  console.log('made it here');
  var oneDayAgo = (new Date).getTime() - microsecondsPerDay;
  chrome.history.search({
    'text': '',              // Return every history item....
    'startTime': oneDayAgo  // that was accessed less than one day ago.
  },
  function(historyItems) {

    for (var i = 0; i < historyItems.length; ++i) {
      var url = historyItems[i].url;
      chrome.history.getVisits({url: url}, function(visitItems) {
        console.log(visitItems)
      })
    };
  });
}

