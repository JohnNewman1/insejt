import { h,  FunctionComponent } from "preact";
import { useCallback, useEffect, useState } from 'preact/hooks';
import { ChromeVisitItem, HistoryItem, SettingsConfig } from "./types";
import { transformChromeHistoryItem } from "./utils/historyItem";
import HistoryTable from "./HistoryTable";
import { excludeUrl, googleSearches, sortBy } from "./utils/historyQuery";
import Container from "@mui/material/Container";
import Header from "./Header";
import MainMenu from "./MainMenu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { DEFAULT_SETTINGS, Views } from "./constants";
import GoogleSearches from "./GoogleSearches";
import Settings from "./Settings";

const App: FunctionComponent = () => {
	const [originalHistory, setOriginalHistory] = useState<HistoryItem[]>([]);
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [googleItems, setGoogleItems] = useState<HistoryItem[][]>([]);
	const [visits, setVisits] = useState<ChromeVisitItem[]>([]);
	const [view, setView] = useState(Views.MAIN_MENU);
	const [showSettingsIcon, setShowSettingsIcon] = useState(true);
	const [settingsConfig, setSettingsConfig] = useState<SettingsConfig>()

	const populateState = useCallback(async () => {
		const settings = await getSettings();
		const microsecondsPerDay = 1000 * 60 * 60 * parseInt(settings.range, 10);
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
		console.log('completed populating')
		setVisits(allVisits.flat());
		setOriginalHistory(historyItems)
	}, [])

	useEffect(() => {
		populateState();
	}, [populateState]);

	const excludeUrls = (historyItems: HistoryItem[]) => {
		const excludedUrls = ['google', 'facebook', 'youtube'];
		return excludeUrl(historyItems, excludedUrls);
	}

	const getSettings = async () => {
		const settings: SettingsConfig  = {}
		const range = await chrome.storage.local.get('range')
		settings.range = range.range || DEFAULT_SETTINGS.range;
		setSettingsConfig(settings)
		return settings;
	}

	const goBack = () => {
		if (view === Views.SETTINGS) populateState();
		setView(Views.MAIN_MENU);
		setShowSettingsIcon(true);
	}

	const setMostPopular = () => {
		setView(Views.HISTORY_LIST)
		const excludedItems = excludeUrls(originalHistory);
		const mostPopularHistory = sortBy(excludedItems, 'visitCount', 'desc')
		setShowSettingsIcon(false);
		setHistory(mostPopularHistory);
	}
	const setMostRecent = () => {
		setView(Views.HISTORY_LIST)
		setShowSettingsIcon(false);
		setHistory(originalHistory);
	}

	const setGoogleSearches = () => {
		setView(Views.GOOGLE_SEARCH);
		const googleItems = googleSearches(originalHistory);
		setShowSettingsIcon(false);
		setGoogleItems(googleItems);
	}

	const goToSettingsPage = () => {
		setView(Views.SETTINGS)
		setShowSettingsIcon(false);

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

			<Header showSettingsIcon={showSettingsIcon} goToSettingsPage={goToSettingsPage} />
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
			{view === Views.SETTINGS &&
			<Settings settingsConfig={settingsConfig} />
			}
		</Container>
	)
}

export default App;