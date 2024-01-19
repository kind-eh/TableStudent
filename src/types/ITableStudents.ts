export interface IColumnData {
  ColumnIds: number[];
  Title: string;
}

export interface IRatesData {
  [key: string]: IColumnData;
}

export interface IStudent {
  id: number;
  studentName: string;
}

export interface IColumn {
  Id: number;
  Title: string;
}
