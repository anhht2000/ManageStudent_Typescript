import citysApi from "api/citysApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { cities, ListResponse } from "typeData";
import {
  actionFetchDataCity,
  actionFetchDataCityFail,
  actionFetchDataCitySuccess,
} from "./citySlice";

function* fetchDataCity() {
  try {
    const response: ListResponse<cities> = yield call(citysApi.getAll);
    yield put(actionFetchDataCitySuccess(response));
  } catch (error) {
    console.log("day la loi", error);
    yield put(actionFetchDataCityFail);
  }
}

export default function* citySaga() {
  yield takeLatest(actionFetchDataCity.type, fetchDataCity);
}
