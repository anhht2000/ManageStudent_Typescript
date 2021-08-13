import { RootState } from "./../../app/store";
import { TypeAction } from "@material-ui/core/styles/createPalette";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { students } from "typeData";

export interface dashboardStatistics {
  maleCount: number;
  femaleCount: number;
  hightMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  ListStudent: Array<students>;
}

export interface dashboardState {
  loading: boolean;
  statistics: dashboardStatistics; //thoongs ke
  highestStudent: students[]; //so luong sinh vien diem cao nhat
  lowestStudent: students[]; //so luong sinh vien diem cao nhat
  rankingByCityList: RankingByCity[];
}

const initialState: dashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    hightMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudent: [],
  lowestStudent: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    //reducer fetch data
    actionFetchData: (state) => {
      state.loading = true;
    },
    actionFetchDataSuccess: (state) => {
      state.loading = false;
    },
    actionFetchDataFail: (state) => {
      state.loading = false;
    },
    //reducer set data
    actionSetStatistics: (
      state,
      action: PayloadAction<dashboardStatistics>
    ) => {
      state.statistics = action.payload;
    },
    actionSetHighestStudent: (state, action: PayloadAction<students[]>) => {
      state.highestStudent = action.payload;
    },
    actionSeLowestStudentt: (state, action: PayloadAction<students[]>) => {
      state.lowestStudent = action.payload;
    },
    actionSetRankingByCityList: (
      state,
      action: PayloadAction<RankingByCity[]>
    ) => {
      state.rankingByCityList = action.payload;
    },
  },
});
//action
export const {
  actionFetchData,
  actionFetchDataSuccess,
  actionFetchDataFail,
  actionSetStatistics,
  actionSetHighestStudent,
  actionSeLowestStudentt,
  actionSetRankingByCityList,
} = dashboardSlice.actions;
//selector

export const getLoading = (state: RootState) => state.dashboard.loading;
export const getStatistics = (state: RootState) => state.dashboard.statistics;
export const getHighestStudent = (state: RootState) =>
  state.dashboard.highestStudent;
export const getLowestStudent = (state: RootState) =>
  state.dashboard.lowestStudent;
export const getRankingByCityList = (state: RootState) =>
  state.dashboard.rankingByCityList;
//reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
