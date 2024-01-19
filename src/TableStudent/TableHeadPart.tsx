import React from 'react';
import { TableHead, TableRow } from '@mui/material';
import { IColumn } from '../types/ITableStudents';
import { StyledTableCell } from './styles';

interface ITableHeadPartProps {
  listColumns: IColumn[];
}

function TableHeadPart({ listColumns }: ITableHeadPartProps) {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell sticky="sticky">№</StyledTableCell>
        <StyledTableCell sticky="sticky">Student</StyledTableCell>
        {listColumns.map((column: IColumn) => (
          <StyledTableCell key={column.Id}>{column.Title}</StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadPart;
