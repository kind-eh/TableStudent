import { IPerson, IColumn, IRate } from './storeModels';

export interface IState {
  tableStudentsSlice: {
    isLoading: boolean;
    dataStudent: IPerson[];
    dataColumns: IColumn[];
    dataRates: IRate[];
  };
}
