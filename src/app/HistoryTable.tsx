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

type HistoryTableProps = {
    historyItems: HistoryItem[];
  };

  const columns = [
    { id: 'title', label: 'Title', minWidth: '70%' },
    { id: 'lastVisited', label: 'Last Visited',  minWidth: '30%' },
  ];

const HistoryTable: FunctionComponent<HistoryTableProps> = ({historyItems}: HistoryTableProps) => {

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
            { historyItems.map((historyItem) => <HistoryRecord historyItem={historyItem} />) }
           </TableBody>
         </Table>
       </TableContainer>
     </Paper>
  )
}

export default HistoryTable;