import { h,  FunctionComponent } from "preact";
import { HistoryItem } from "./types";
import { convertUTCtoLocalTime, hhmm } from "./utils/date";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

type HistoryRecordProps = {
  historyItem: HistoryItem
}

const HistoryRecord: FunctionComponent<HistoryRecordProps> = ({historyItem}: HistoryRecordProps) => {

  const shortenString = (url: string) => {
    if(url.length > 30) {
      return url.substring(0, 30) + '...';
    }
    return url;
  }
  const titleStyle = {
    padding: '8px',
    minWidth: '70%'
  }
  const timeStyle = {
    padding: '8px',
    minWidth: '30%'
  }

  return (
        <TableRow hover role="checkbox" tabIndex={-1} key={historyItem.id}>
          <Tooltip title={historyItem.title} placement="top">
            <TableCell style={titleStyle} align="left">
              <a href={historyItem.url} target="_blank" style={{textDecoration: 'none'}}>
                {historyItem.title.length > 0 ? shortenString(historyItem.title) : shortenString(historyItem.url)}
              </a>
            </TableCell>
          </Tooltip>
          <TableCell style={timeStyle} align="left">
            {hhmm(historyItem.lastVisitTime)}
          </TableCell>
        </TableRow>
  )
}

export default HistoryRecord;