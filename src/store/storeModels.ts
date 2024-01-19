export interface StudentDTO {
  isLoading: boolean;
  dataStudent: IPerson[];
  dataColumns: IColumn[];
  dataRates: IRate[];
}

export interface IStudentItems {
  Items: IPerson[];
  Quantity: number;
}

export interface IPerson {
  Id: number;
  FirstName: string | null;
  SecondName: string | null;
  LastName: string | null;
}

export interface IColumnItems {
  Items: IColumn[];
  Quantity: number;
}

export interface IColumn {
  Id: number;
  Title: string;
}

export interface IRateItems {
  Items: IRate[];
  Quantity: number;
}

export interface IRate {
  Id: number;
  Title: string;
  SchoolboyId: number;
  ColumnId: number;
}

export interface IStudentSetRate {
  SchoolboyId: number;
  ColumnId: number;
  Title: string;
}

export interface IStudentUnRate {
  SchoolboyId: number;
  ColumnId: number;
}
