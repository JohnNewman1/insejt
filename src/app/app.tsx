// let checkHistory = document.getElementById("checkHistory");

// checkHistory.addEventListener("click", async () => {
//   checkOutSomeHistory();

// });

// function checkOutSomeHistory2() {
//   var microsecondsPerDay= 1000 * 60 * 60 * 24;
//   var oneDayAgo = (new Date).getTime() - microsecondsPerDay;
//   chrome.history.search({
//     'text': '',              
//     'startTime': oneDayAgo  
//   },
//   function(historyItems) {

//     for (var i = 0; i < historyItems.length; ++i) {
//       var url = historyItems[i].url;
//       chrome.history.getVisits({url: url}, function(visitItems) {
//         console.log(visitItems)
//       })
//     };
//   });
// }

import {h,  FunctionComponent } from "preact";

const App: FunctionComponent = () => {
        return (
            <div id="app-root">
                <button>Check History</button>
            </div>
        )
}

export default App;