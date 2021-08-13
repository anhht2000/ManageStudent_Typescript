import { RootState } from "./../../app/store";
import { ListResponse, PaginationParams } from "./../../typeData/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Params, students } from "typeData";

export interface StudentState {
  loading: boolean;
  list: students[];
  filter: Params;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 10,
  },
};

const StudentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    actionFetchListStudent: (state, action: PayloadAction<Params>) => {
      state.loading = true;
    },
    actionFetchListStudentSuccess: (state, action: PayloadAction<ListResponse<students>>) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    actionFetchListStudentFail: (state) => {
      state.loading = false;
    },

    actionSetFilter: (state, action: PayloadAction<Params>) => {
      state.filter = action.payload;
    },
    actionSetFilterDebounce: (state, action: PayloadAction<string>) => {},
    actionSetFilterDebounceSuccess: (state, action: PayloadAction<string>) => {
      state.filter = { ...state.filter, name_like: action.payload, _page: 1 };
    },
  },
});

//action
export const {
  actionFetchListStudent,
  actionFetchListStudentSuccess,
  actionFetchListStudentFail,
  actionSetFilter,
  actionSetFilterDebounce,
  actionSetFilterDebounceSuccess,
} = StudentSlice.actions;
//selector
export const getLoading = (state: RootState) => state.student.loading;
export const getListStudent = (state: RootState) => state.student.list;
export const getFilter = (state: RootState) => state.student.filter;
export const getPagination = (state: RootState) => state.student.pagination;
//reducer
const StudentReducer = StudentSlice.reducer;
export default StudentReducer;
