import studentApi from "api/studentApi";
import { ListResponse, Params, students } from "typeData";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import {
  actionFetchListStudent,
  actionFetchListStudentFail,
  actionFetchListStudentSuccess,
  actionSetFilterDebounce,
  actionSetFilterDebounceSuccess,
} from "./StudentSlice";

function* fetchData(action: PayloadAction<Params>) {
  try {
    const response: ListResponse<students> = yield call(studentApi.getAll, action.payload);
    yield put(actionFetchListStudentSuccess(response));
  } catch (error) {
    console.log("loi cua ban la", error);
    yield put(actionFetchListStudentFail());
  }
}
function* fetchDataSearchDebounce(action: PayloadAction<string>) {
  console.log("Debounce data", action.payload);
  yield put(actionSetFilterDebounceSuccess(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(actionFetchListStudent.type, fetchData);
  yield debounce(1000, actionSetFilterDebounce.type, fetchDataSearchDebounce);
}
