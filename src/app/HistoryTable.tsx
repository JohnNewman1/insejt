import { h,  FunctionComponent } from "preact";
import HistoryRecord from "./HistoryRecord";
import { useState } from 'preact/hooks';
import { HistoryItem } from "./types";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

type HistoryTableProps = {
    historyItems: HistoryItem[];
  };

  const columns = [
    { id: 'title', label: 'Title', format: false },
    { id: 'url', label: 'Url', format: false},
  ];

const HistoryTable: FunctionComponent<HistoryTableProps> = ({historyItems}: HistoryTableProps) => {

  return (
    // <table>
    //     <tr>
    //         <th>ID</th>
    //         <th>lastVisitTime</th>
    //         <th>title</th>
    //         <th>url</th>
    //         <th>typedCount</th>
    //         <th>visitCount</th>
    //         <th>visits</th>
    //     </tr>
    //     { historyItems.map((historyItem) => <HistoryRecord historyItem={historyItem} />) }
    // </table>
       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
       <TableContainer sx={{ maxHeight: 440 }}>
         <Table stickyHeader aria-label="sticky table">
           <TableHead>
             <TableRow>
               {columns.map((column) => (
                 <TableCell
                   key={column.id}
                   align={column.align}
                   style={{ minWidth: '20px'}}
                 >
                   {column.label}
                 </TableCell>
               ))}
             </TableRow>
           </TableHead>
           <TableBody>
             {historyItems
               .map((row) => {
                 return (
                   <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell key={row.id} align="left">
                      {row.title}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                      {row.url}
                      </TableCell>
                   </TableRow>
                 );
               })}
           </TableBody>
         </Table>
       </TableContainer>
     </Paper>
  )
}

export default HistoryTable;