import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { login, LoginPayload, loginSuccess, logout } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  yield delay(1000);
  //handle login thanh cong
  localStorage.setItem("access_token", "Ok");
  yield put(loginSuccess({ id: "2", name: "tuananh" }));

  //redirect
  yield put(push("/admin/dashboard"));
}
function* handleLogout() {
  yield delay(1000);

  localStorage.removeItem("access_token");
  //redirect
  yield put(push("/admin"));
}
function* watchLoginFlow() {
  while (true) {
    const isLogin = Boolean(localStorage.getItem("access_token"));
    if (!isLogin) {
      //neu chua dang nhap thi se thuc hien duoc dang nhap con khong thi khongf
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout); //call hay fork cung duoc nhung call la blocking call
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
