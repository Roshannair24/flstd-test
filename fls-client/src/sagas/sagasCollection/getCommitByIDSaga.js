import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { getCommitByIDApi } from "../../Services/getCommitByIDService";
import { updateCommitByID } from "../../reducers/repoReducer";

function* getCommitByIDSaga(action) {
  // console.log("getCommitByIDsaga", action);

  const resp = yield call(getCommitByIDApi, action);

  // console.log("resp getCommitByIDSaga fl", resp?.data);

  if (resp?.data?.length > 0) {
    yield put(updateCommitByID(resp?.data));
  }
}

export default getCommitByIDSaga;
