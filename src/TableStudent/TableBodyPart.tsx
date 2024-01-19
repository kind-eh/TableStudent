import React, { useState } from 'react';
import { TableBody } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  getListRates,
  setRate,
  setUnRate,
} from '../store/slices/tableStudents';
import { useAppDispatch } from '../store';
import { IRatesData, IStudent, IColumn } from '../types/ITableStudents';
import { StyledTableCell, StyledTableRow } from './styles';
import Snackbar from '../Common/Snackbar';

interface ITableBodyPartProps {
  listStudents: IStudent[];
  listColumns: IColumn[];
  listRates: IRatesData;
}

function TableBodyPart({
  listStudents,
  listColumns,
  listRates,
}: ITableBodyPartProps) {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  const getRates = (studentId: number) => {
    return listColumns.map((columns: IColumn) => {
      const isStudentPass = listRates[studentId]?.ColumnIds.includes(
        columns.Id,
      );
      const titleRate = isStudentPass ? listRates[studentId].Title : '';
      const id = `${columns.Id}-${studentId}`;
      return (
        <StyledTableCell
          key={id}
          onClick={() => handleStudentPass(columns.Id, studentId, titleRate)}
        >
          {titleRate || ''}
        </StyledTableCell>
      );
    });
  };

  const handleStudentPass = async (
    columnsId: number,
    studentId: number,
    titleRate: string,
  ) => {
    try {
      const result = titleRate
        ? await dispatch(
            setUnRate({ SchoolboyId: studentId, ColumnId: columnsId }),
          )
        : await dispatch(
            setRate({
              SchoolboyId: studentId,
              ColumnId: columnsId,
              Title: 'H',
            }),
          );

      unwrapResult(result);
      unwrapResult(await dispatch(getListRates()));
    } catch (err: any) {
      setError(`${err.status} ${err.data}`);
    }
  };

  return (
    <>
      <TableBody>
        {listStudents.map((student: IStudent, i: number) => (
          <StyledTableRow key={student.id}>
            <StyledTableCell sticky="sticky">{i + 1}</StyledTableCell>
            <StyledTableCell sticky="sticky">
              {student.studentName}
            </StyledTableCell>
            {getRates(student.id)}
          </StyledTableRow>
        ))}
      </TableBody>
      <Snackbar message={error} setError={setError} />
    </>
  );
}

export default TableBodyPart;
