import { h,  FunctionComponent } from "preact";
import { useEffect, useState } from 'preact/hooks';
import { ChromeVisitItem, HistoryItem, OrderBy } from "./types";
import { transformChromeHistoryItem } from "./utils/historyItem";
import HistoryTable from "./HistoryTable";
import { excludeUrl, sortBy } from "./utils/historyQuery";
import Container from "@mui/material/Container";
import Header from "./Header";
import MainMenu from "./MainMenu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

const App: FunctionComponent = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [visits, setVisits] = useState<ChromeVisitItem[]>([]);
  const [displayMenu, setDisplayMenu] = useState(true);

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

const buttonStyle = {
  position: 'absolute',
  top: '-25px',
  right: '25px',
  backgroundColor: '#536DFE',
  zIndex: 3
}

  return (
      <Container fixed sx={{ width: '375px' }} disableGutters={true} >

        <Header />
        {displayMenu &&
        <MainMenu setMenu={setDisplayMenu} /> 
        }

        {!displayMenu &&
          <div style={{position: 'relative'}}>
           <IconButton aria-label="Back" onClick={() => setDisplayMenu(true)} style={buttonStyle} sx={{ boxShadow: 3 }} >
             <ArrowBackIcon style={{color: 'white'}}/>
           </IconButton>
          </div>
      }
        {!displayMenu &&
          <HistoryTable historyItems={history} />
        }
      </Container>
  )
}

export default App;