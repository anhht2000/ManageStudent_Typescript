import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cities, ListResponse } from "typeData";
import { RootState } from "./../../app/store";

interface cityState {
  loading: boolean;
  list: cities[];
}
const initialState: cityState = {
  loading: false,
  list: [],
};
const citySlice = createSlice({
  name: "city",
  initialState: initialState,
  reducers: {
    actionFetchDataCity(state) {
      state.loading = true;
    },
    actionFetchDataCitySuccess(state, action: PayloadAction<ListResponse<cities>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    actionFetchDataCityFail(state) {
      state.loading = false;
    },
  },
});

//acitons
export const { actionFetchDataCity, actionFetchDataCitySuccess, actionFetchDataCityFail } =
  citySlice.actions;
//selector
export const getLoadingCity = (state: RootState) => state.city.loading;
export const getListCity = (state: RootState) => state.city.list;
//reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
