import { h,  FunctionComponent } from "preact";
import { HistoryItem } from "./types";
import { convertUTCtoLocalTime } from "./utils/date";

type HistoryRecordProps = {
  historyItem: HistoryItem
}

const HistoryRecord: FunctionComponent<HistoryRecordProps> = ({historyItem}: HistoryRecordProps) => {

  const shortenUrl = (url: string) => {
    if(url.length > 50) {
      return url.substring(0, 50) + '...';
    }
    return url;
  }

  return (
        <tr>
          <th>{historyItem.id}</th>
          <th>{convertUTCtoLocalTime(historyItem.lastVisitTime)}</th>
          <th>{historyItem.title}</th>
          <th>{shortenUrl(historyItem.url)}</th>
          <th>{historyItem.typedCount}</th>
          <th>{historyItem.visitCount}</th>
          <th>{JSON.stringify(historyItem.visits)}</th>
        </tr>
  )
}

export default HistoryRecord;