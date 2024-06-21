import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { testApi } from "../../Services/testService";

function* testSaga(action) {
  console.log("test saga", action);

  const resp = yield call(testApi, { payload: { foo: "bar" } });

  console.log("resp fl", resp?.data);
}

export default testSaga;
