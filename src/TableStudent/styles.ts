import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableRow } from '@mui/material/';
import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)<{ sticky?: string }>(
  ({ theme, sticky }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      ...(sticky && {
        position: 'sticky',
        zIndex: 10,
        left: 0,
        '&:nth-of-type(2)': {
          left: 48,
          zIndex: 11,
        },
      }),
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      ...(sticky && {
        position: 'sticky',
        zIndex: 9,
        left: 0,
        '&:nth-of-type(2)': {
          left: 48,
        },
      }),
    },
  }),
);

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    '& .MuiTableCell-root': {
      backgroundColor: 'white',
    },
  },
  '& .MuiTableCell-root': {
    backgroundColor: '#f5f5f5',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
