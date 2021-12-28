import { h,  FunctionComponent } from "preact";
import HistoryRecord from "./HistoryRecord";
import { HistoryItem } from "./types";

type HistoryTableProps = {
    historyItems: HistoryItem[];
  };


const HistoryTable: FunctionComponent<HistoryTableProps> = ({historyItems}: HistoryTableProps) => {

  return (
    <table>
        <tr>
            <th>ID</th>
            <th>lastVisitTime</th>
            <th>title</th>
            <th>url</th>
            <th>typedCount</th>
            <th>visitCount</th>
            <th>visits</th>
        </tr>
        { historyItems.map((historyItem) => <HistoryRecord historyItem={historyItem} />) }
    </table>
  )
}

export default HistoryTable;