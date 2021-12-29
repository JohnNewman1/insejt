import { h,  FunctionComponent } from "preact";
import { useState } from 'preact/hooks';
import { ChromeVisitItem, HistoryItem } from "./types";
import HistoryTable from "./historyTable";
import { transformChromeHistoryItem } from "./utils/historyItem";


const App: FunctionComponent = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [visits, setVisits] = useState<ChromeVisitItem[]>([]);

  const checkOutSomeHistory = async () => {
    const microsecondsPerDay= 1000 * 60 * 60 * 24;
    const oneDayAgo = (new Date).getTime() - microsecondsPerDay;
    const chromeHistoryItems = await chrome.history.search({
      'text': '',              
      'startTime': oneDayAgo,
      maxResults: 10000
    });
    const historyItems = [];
    const allVisits = []
    for(let i = 0; i < chromeHistoryItems.length; i++) {
      const historyItem = chromeHistoryItems[i];
      const visits = await chrome.history.getVisits({url: historyItem.url});
      allVisits.push(visits);
      historyItems.push(transformChromeHistoryItem(historyItem));
    }

    setVisits(allVisits.flat());
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