import { h,  FunctionComponent } from "preact";
import { useState } from 'preact/hooks';
import { HistoryItem } from "./types";


const App: FunctionComponent = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const checkOutSomeHistory = async () => {
    const microsecondsPerDay= 1000 * 60 * 60 * 24;
    const oneDayAgo = (new Date).getTime() - microsecondsPerDay;
    const chromeHistoryItems = await chrome.history.search({
      'text': '',              
      'startTime': oneDayAgo,
      maxResults: 10000
    });
    const historyItems = [];
    for(let i = 0; i < chromeHistoryItems.length; i++) {
      const historyItem = chromeHistoryItems[i];
      const item = {
        id: historyItem.id,
        lastVisitTime: historyItem.lastVisitTime,
        title: historyItem.title,
        url: historyItem.url,
        typedCount: historyItem.typedCount,
        visitCount: historyItem.visitCount,
        visits: await chrome.history.getVisits({ url: historyItem.url })
      };
      historyItems.push(item);
    }
    setHistory(historyItems)
  };

  const listItems = history.map((link) => <li>{JSON.stringify(link)}</li>)
  return (
      <div id="app-root">
          <button onClick={checkOutSomeHistory}>Check History</button>
          <ul>{listItems}</ul>
      </div>
  )
}

export default App;