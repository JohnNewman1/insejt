import { h,  FunctionComponent } from "preact";

const App: FunctionComponent = () => {
  const checkOutSomeHistory = () => {
    const microsecondsPerDay= 1000 * 60 * 60 * 24;
    const oneDayAgo = (new Date).getTime() - microsecondsPerDay;

    chrome.history.search({
      'text': '',              
      'startTime': oneDayAgo  
    },
    function(historyItems) {
      for (let i = 0; i < historyItems.length; ++i) {
        const url = historyItems[i].url;
        chrome.history.getVisits({url: url}, function(visitItems) {
          console.log(visitItems)
        })
      }
    });
  }
      return (
          <div id="app-root">
              <button onClick={checkOutSomeHistory}>Check History</button>
          </div>
      )
}

export default App;