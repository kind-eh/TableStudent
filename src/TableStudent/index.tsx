import React, { useEffect, useState } from 'react';
import { Paper, Table, Box, TableContainer } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import Snackbar from '../Common/Snackbar';
import {
  getListStudents,
  getListColumns,
  getListRates,
} from '../store/slices/tableStudents';
import {
  selectListStudents,
  selectListStudentsLoading,
  selecTableColumns,
  selecTableRates,
} from '../store/selectors/tableStudents';
import { useAppDispatch, useTypedSelector } from '../store';
import TableHeadPart from './TableHeadPart';
import TableBodyPart from './TableBodyPart';
import { IRatesData, IStudent, IColumn } from '../types/ITableStudents';
import CircularProgress from '@mui/material/CircularProgress';

function TableStudent() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  const listStudents: IStudent[] = useTypedSelector(selectListStudents);
  const listColumns: IColumn[] = useTypedSelector(selecTableColumns);
  const listRates: IRatesData = useTypedSelector(selecTableRates);
  const isLoading = useTypedSelector(selectListStudentsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResult, columnsResult, ratesResult] = await Promise.all([
          dispatch(getListStudents()),
          dispatch(getListColumns()),
          dispatch(getListRates()),
        ]);
        unwrapResult(studentsResult);
        unwrapResult(columnsResult);
        unwrapResult(ratesResult);
      } catch (err: any) {
        setError(`${err.status} ${err.data}`);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box sx={{ height: '100vh', padding: '50px' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          style={{ height: '100%', overflow: 'auto' }}
        >
          <Table stickyHeader>
            <TableHeadPart listColumns={listColumns} />
            <TableBodyPart
              listStudents={listStudents}
              listColumns={listColumns}
              listRates={listRates}
            />
          </Table>
        </TableContainer>
      )}
      <Snackbar message={error} setError={setError} />
    </Box>
  );
}

export default TableStudent;

// The user sees all the data on one page,
// which can be convenient when there is a small amount of data and
// when an overall picture is important.
// The downside may occur when loading a large volume of data,
// as it can take time and lead to significant delays.
