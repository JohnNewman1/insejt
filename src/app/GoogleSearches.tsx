import { h,  FunctionComponent } from "preact";
import HistoryRecord from "./HistoryRecord";
import { HistoryItem } from "./types";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "preact/hooks";
import { HistoryRecordType } from "./constants";

type GoogleSearchesProps = {
    groupedSearches: HistoryItem[][];
    originalHistory: HistoryItem[];
    visits: chrome.history.VisitItem[];
  };

const columns = [
	{ id: 'title', label: 'Search ', minWidth: '70%' },
	{ id: 'lastVisited', label: 'Time',  minWidth: '30%' },
];

const GoogleSearches: FunctionComponent<GoogleSearchesProps> = ({groupedSearches, originalHistory, visits}: GoogleSearchesProps) => {
	const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])
	const [searchedItems, setSearchItems] = useState<HistoryItem[]>([])
	useEffect(() => {
		setHistoryItems(groupedSearches.map(group => group[0]))
	},[groupedSearches]);

	const clickItem = (historyItem) => {
		const index = historyItems.findIndex(item => item.id === historyItem.id);
		const clickedGroup = groupedSearches[index];
		const visitIds = clickedGroup.reduce((visitIds, item) => {
			return visitIds.concat(item.visits.map(visit => visit.visitId))
		}, [])
		const referredVisits = visits.filter(visit => visitIds.includes(visit.referringVisitId)).map(visit => visit.id);
		const visitedFromGoogleSearch = originalHistory.filter(historyItem => referredVisits.includes(historyItem.id));
		setSearchItems(visitedFromGoogleSearch);
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
                 
									key={column.id}
									align="left"
									style={{ minWidth: column.minWidth, padding: '8px'}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{searchedItems.length > 0 && searchedItems.map((historyItem) => 
							<HistoryRecord key={historyItem.id} historyItem={historyItem} />)}

						{ searchedItems.length === 0 && historyItems.map((historyItem) => 
							<HistoryRecord 
								key={historyItem.id}
								historyItem={historyItem} 
								historyRecordType={HistoryRecordType.GOOGLE_SEARCH}
								clickItem={clickItem} 
							/>) }
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default GoogleSearches;