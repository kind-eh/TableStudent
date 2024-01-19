import { createSelector } from 'reselect';
import { IState } from '../state';
import { IRatesData } from '../../types/ITableStudents';

export const selectListStudentsBranch = (state: IState) =>
  state.tableStudentsSlice;

export const selectListStudents = createSelector(
  selectListStudentsBranch,
  (listStudents) => {
    return listStudents?.dataStudent.map((item) => {
      return {
        id: item.Id,
        studentName: `${item.LastName || ''} ${item.FirstName || ''} ${
          item.SecondName || ''
        }`,
      };
    });
  },
);

export const selectListStudentsLoading = createSelector(
  selectListStudentsBranch,
  (listStudents) => {
    return listStudents.isLoading;
  },
);

export const selecTableColumns = createSelector(
  selectListStudentsBranch,
  (listColumns) => {
    return listColumns.dataColumns;
  },
);

export const selecTableRates = createSelector(
  selectListStudentsBranch,
  (listRates) => {
    const result: IRatesData = {};
    listRates?.dataRates?.forEach((item) => {
      const { SchoolboyId, ColumnId, Title } = item;
      if (!result[SchoolboyId]) {
        result[SchoolboyId] = { ColumnIds: [ColumnId], Title };
      } else {
        result[SchoolboyId].ColumnIds.push(ColumnId);
      }
    });

    return result;
  },
);
