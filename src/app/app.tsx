import { h,  FunctionComponent } from "preact";
import { useState } from 'preact/hooks';
import { HistoryItem } from "./types";
import HistoryTable from "./historyTable";


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

  return (
      <div id="app-root">
          <button onClick={checkOutSomeHistory}>Check History</button>
          <HistoryTable historyItems={history} />
      </div>
  )
}

export default App;