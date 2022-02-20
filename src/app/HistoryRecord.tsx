import { h,  FunctionComponent } from "preact";
import { HistoryItem } from "./types";
import { hhmm } from "./utils/date";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { HistoryRecordType } from "./constants";

type HistoryRecordProps = {
  historyItem: HistoryItem
  historyRecordType?: HistoryRecordType
  clickItem?: (historyItem: HistoryItem) => void
}

const HistoryRecord: FunctionComponent<HistoryRecordProps> = ({historyItem, historyRecordType, clickItem}: HistoryRecordProps) => {

	const shortenString = (string: string) => {
		if(string.length > 30) {
			return `${string.substring(0, 30)  }...`;
		}
		return string;
	}

	const extractGoogleSearchTerm = (title: string) => {
		return title.split('- Google Search')[0];
	}

	const titleStyle = {
		padding: '8px',
		minWidth: '70%',
		cursor: 'pointer'
	}

	const timeStyle = {
		padding: '8px',
		minWidth: '30%'
	}

	return (
		<TableRow hover role="checkbox" tabIndex={-1} key={historyItem.id}>
			{{historyRecordType}}
			<Tooltip title={historyItem.title} placement="top">
				<TableCell onClick={() => clickItem(historyItem)} style={titleStyle} align="left">
					{historyRecordType === HistoryRecordType.DEFAULT && 
					<a href={historyItem.url} target="_blank" style={{textDecoration: 'none'}} rel="noreferrer">
						{historyItem.title.length > 0 ? shortenString(historyItem.title) : shortenString(historyItem.url)}
					</a>}
					{historyRecordType === HistoryRecordType.GOOGLE_SEARCH && 
                shortenString((extractGoogleSearchTerm(historyItem.title)))
					}
				</TableCell>
			</Tooltip>
			<TableCell style={timeStyle} align="left">
				{hhmm(historyItem.lastVisitTime)}
			</TableCell>
		</TableRow>
	)
}

HistoryRecord.defaultProps = {
	historyRecordType: HistoryRecordType.DEFAULT
}

export default HistoryRecord;