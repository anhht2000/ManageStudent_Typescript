import citysApi from "api/citysApi";
import { cities, students } from "typeData";
import { ListResponse } from "typeData";
import studentApi from "api/studentApi";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  actionFetchData,
  actionFetchDataFail,
  actionSeLowestStudentt,
  actionSetHighestStudent,
  actionSetRankingByCityList,
  actionSetStatistics,
  RankingByCity,
} from "./dashboardSlice";

function* setStatistics() {
  const arrData: Array<ListResponse<students>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "male" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "female" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }), //lay nhung htang lown hon 8
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const staticsData = arrData.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = staticsData;
  yield put(
    actionSetStatistics({
      maleCount,
      femaleCount,
      hightMarkCount,
      lowMarkCount,
    })
  );
}
function* highestStudent() {
  const { data }: ListResponse<students> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });

  yield put(actionSetHighestStudent(data));
}
function* lowestStudent() {
  const { data }: ListResponse<students> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  });

  yield put(actionSeLowestStudentt(data));
}
function* rankingByCity() {
  const { data: citiesList }: ListResponse<cities> = yield call(citysApi.getAll);
  const { data: studentsList }: ListResponse<students> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 1000,
  });

  const arrStudentIncity: Array<RankingByCity> = [];
  citiesList.forEach((city) => {
    let ArrStudentIncity = studentsList.filter((student) => {
      return student.city === city.code;
    });
    ArrStudentIncity = ArrStudentIncity.slice(0, 5).sort((a, b) => b.mark - a.mark);

    const EditData = { cityId: city.code, ListStudent: ArrStudentIncity };
    arrStudentIncity.push(EditData);
  });
  yield put(actionSetRankingByCityList(arrStudentIncity));
}

function* fetchData() {
  try {
    yield all([
      call(setStatistics),
      call(highestStudent),
      call(lowestStudent),
      call(rankingByCity),
    ]);
    yield put(actionFetchDataFail());
  } catch (error) {
    yield put(actionFetchDataFail());
    console.log(error);
  }
}

export default function* dashboardSaga() {
  console.log("Ok");

  yield takeLatest(actionFetchData.type, fetchData);
}
