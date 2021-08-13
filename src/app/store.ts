import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import creatSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import authReducer from "features/auth/authSlice";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import dashboardReducer from "features/dashboard/dashboardSlice";
import StudentReducer from "features/student/StudentSlice";
import cityReducer from "features/city/citySlice";

const sagaMiddleware = creatSagaMiddleware();

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: StudentReducer,
  city: cityReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //day la cac middleware default khong truyen vao thi la mac dinh
      thunk: true,
      immutableCheck: true, //kiem tra xem state duoc mutet
      serializableCheck: true, //la chi cho state nhan vao gia tri khong nhan vao function promise,symbol
    }).concat(sagaMiddleware, routerMiddleware(history)),
  devTools: true,
});
//phai run saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
