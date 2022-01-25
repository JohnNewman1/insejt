import { h,  FunctionComponent } from "preact";
import { useEffect, useState } from 'preact/hooks';
import { ChromeVisitItem, HistoryItem, OrderBy } from "./types";
import { transformChromeHistoryItem } from "./utils/historyItem";
import HistoryTable from "./HistoryTable";


const App: FunctionComponent = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [visits, setVisits] = useState<ChromeVisitItem[]>([]);

  useEffect(() => {
    const populateState = async () => {
      const microsecondsPerDay = 1000 * 60 * 60 * 24;
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
    }
    populateState();
}, []);

useEffect(() => { 
     console.log('Updated State', history)
  }, [history])

const sortBy = (key: string, order: OrderBy = 'asc') => {
    let newHistory = [...history]; 

    if (order === 'asc') {
       newHistory = newHistory.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
    } else {
       newHistory = newHistory.sort((a,b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0))
    }
    setHistory(newHistory);
}

  return (
      <div id="app-root">
          <button onClick={() => sortBy('visitCount', 'desc')}>Most Popular</button>

          <HistoryTable historyItems={history} />
      </div>
  )
}

export default App;