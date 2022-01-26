import { h,  FunctionComponent } from "preact";
import { useEffect, useState } from 'preact/hooks';
import { ChromeVisitItem, HistoryItem, OrderBy } from "./types";
import { transformChromeHistoryItem } from "./utils/historyItem";
import HistoryTable from "./HistoryTable";
import { excludeUrl, sortBy } from "./utils/historyQuery";


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
      const excludedItems = excludeUrls(historyItems);
      setVisits(allVisits.flat());
      setHistory(excludedItems)
    }
    populateState();
}, []);

const excludeUrls = (historyItems: HistoryItem[]) => {
  const excludedUrls = ['google', 'facebook', 'youtube'];
  let newHistoryItems = [...historyItems]
  excludedUrls.forEach(url => {
     newHistoryItems = excludeUrl(newHistoryItems, url);
  })
  return newHistoryItems
}

const setMostPopular = () => {
  const mostPopularHistory = sortBy(history, 'visitCount', 'desc')
  setHistory(mostPopularHistory);
}

  return (
      <div id="app-root">
          <button onClick={() => setMostPopular()}>Most Popular</button>

          <HistoryTable historyItems={history} />
      </div>
  )
}

export default App;