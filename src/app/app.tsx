import { h,  FunctionComponent } from "preact";
import { useEffect, useState } from 'preact/hooks';
import { ChromeVisitItem, HistoryItem, OrderBy } from "./types";
import { transformChromeHistoryItem } from "./utils/historyItem";
import HistoryTable from "./HistoryTable";
import { excludeUrl, sortBy } from "./utils/historyQuery";
import Container from "@mui/material/Container";


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
  return excludeUrl(historyItems, excludedUrls);
}

const setMostPopular = () => {
  const mostPopularHistory = sortBy(history, 'visitCount', 'desc')
  setHistory(mostPopularHistory);
}

  return (
      <Container fixed sx={{ width: '375px' }} >
          <button onClick={() => setMostPopular()}>Most Popular</button>

          <HistoryTable historyItems={history} />
      </Container>
  )
}

export default App;