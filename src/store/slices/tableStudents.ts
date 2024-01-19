import axiosInstance from '../../services/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetInfoStudentsEndpoints } from '../../api/endpoints';
import {
  StudentDTO,
  IStudentItems,
  IColumnItems,
  IRateItems,
  IStudentSetRate,
  IStudentUnRate,
} from '../storeModels';

const branchName = 'tableStudents';

const initialState: StudentDTO = {
  isLoading: false,
  dataStudent: [],
  dataColumns: [],
  dataRates: [],
};

export const getListStudents = createAsyncThunk(
  `${branchName}/getListStudents`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IStudentItems>(
        GetInfoStudentsEndpoints.GetStudents,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);

export const getListColumns = createAsyncThunk(
  `${branchName}/getListColumns`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IColumnItems>(
        GetInfoStudentsEndpoints.GetColumns,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);

export const getListRates = createAsyncThunk(
  `${branchName}/getListRates`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<IRateItems>(
        GetInfoStudentsEndpoints.Rates,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);

export const setRate = createAsyncThunk(
  `${branchName}/setRate`,
  async (data: IStudentSetRate, { rejectWithValue }) => {
    try {
      await axiosInstance.post<any>(GetInfoStudentsEndpoints.Rates, data);
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);

export const setUnRate = createAsyncThunk(
  `${branchName}/setUnRate`,
  async (data: IStudentUnRate, { rejectWithValue }) => {
    try {
      await axiosInstance.post<any>(GetInfoStudentsEndpoints.UnRate, data);
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  },
);

const tableStudentsSlice = createSlice({
  name: `${branchName}`,
  initialState,
  reducers: {},
  extraReducers: (reducerBuilder) => {
    reducerBuilder.addCase(getListStudents.pending, (state) => {
      state.isLoading = true;
    });
    reducerBuilder.addCase(getListStudents.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.dataStudent = payload.Items;
    });
    reducerBuilder.addCase(getListStudents.rejected, (state) => {
      state.isLoading = false;
    });
    reducerBuilder.addCase(getListColumns.fulfilled, (state, { payload }) => {
      state.dataColumns = payload.Items;
    });
    reducerBuilder.addCase(getListRates.fulfilled, (state, { payload }) => {
      state.dataRates = payload.Items;
    });
  },
});

export default tableStudentsSlice.reducer;
