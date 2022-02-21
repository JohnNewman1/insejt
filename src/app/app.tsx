import { h,  FunctionComponent } from "preact";
import { useEffect, useState } from 'preact/hooks';
import { ChromeVisitItem, HistoryItem } from "./types";
import { transformChromeHistoryItem } from "./utils/historyItem";
import HistoryTable from "./HistoryTable";
import { excludeUrl, googleSearches, sortBy } from "./utils/historyQuery";
import Container from "@mui/material/Container";
import Header from "./Header";
import MainMenu from "./MainMenu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { Views } from "./constants";
import GoogleSearches from "./GoogleSearches";

const App: FunctionComponent = () => {
	const [originalHistory, setOriginalHistory] = useState<HistoryItem[]>([]);
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [googleItems, setGoogleItems] = useState<HistoryItem[][]>([]);
	const [visits, setVisits] = useState<ChromeVisitItem[]>([]);
	const [view, setView] = useState(Views.MAIN_MENU);

	useEffect(() => {
		const populateState = async () => {
			const microsecondsPerDay = 1000 * 60 * 60 * 24;
			const oneDayAgo = (new Date).getTime() - microsecondsPerDay;
			const chromeHistoryItems = await chrome.history.search({
				text: '',              
				startTime: oneDayAgo,
				maxResults: 10000
			});
			const historyItems = [];
			const allVisits = []
			for(let i = 0; i < chromeHistoryItems.length; i++) {
				const historyItem = chromeHistoryItems[i];
				const visits = await chrome.history.getVisits({url: historyItem.url});
				allVisits.push(visits);
				historyItems.push(transformChromeHistoryItem(historyItem, visits));
			}
			setVisits(allVisits.flat());
			setOriginalHistory(historyItems)
		}
		populateState();
	}, []);

	const excludeUrls = (historyItems: HistoryItem[]) => {
		const excludedUrls = ['google', 'facebook', 'youtube'];
		return excludeUrl(historyItems, excludedUrls);
	}

	const goBack = () => {
		setView(Views.MAIN_MENU);
	}

	const setMostPopular = () => {
		setView(Views.HISTORY_LIST)
		const excludedItems = excludeUrls(originalHistory);
		const mostPopularHistory = sortBy(excludedItems, 'visitCount', 'desc')
		setHistory(mostPopularHistory);
	}
	const setMostRecent = () => {
		setView(Views.HISTORY_LIST)
		setHistory(originalHistory);
	}

	const setGoogleSearches = () => {
		setView(Views.GOOGLE_SEARCH);
		const googleItems = googleSearches(originalHistory);
		console.log(googleItems);
		setGoogleItems(googleItems);
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
			{view === Views.MAIN_MENU  &&
			<MainMenu setMostRecent={setMostRecent} setMostPopular={setMostPopular} setGoogle={setGoogleSearches} /> 
			}

			{view !== Views.MAIN_MENU && 
			<div style={{position: 'relative'}}>
				<IconButton aria-label="Back" onClick={() => goBack()} style={buttonStyle} sx={{ boxShadow: 3 }} >
					<ArrowBackIcon style={{color: 'white'}} />
				</IconButton>
			</div>
			}
			{view === Views.HISTORY_LIST &&
			<HistoryTable historyItems={history} />
			}
			{view === Views.GOOGLE_SEARCH &&
			<GoogleSearches groupedSearches={googleItems} originalHistory={originalHistory} visits={visits} />
			}
		</Container>
	)
}

export default App;