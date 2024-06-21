import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { getCommitDiffByIDApi } from "../../Services/getCommitDiffByIDService";
import { updateCommitDiffByID } from "../../reducers/repoReducer";

function* getCommitDiffByIDSaga(action) {
  console.log("getCommitDiffByIDSaga", action);

  const resp = yield call(getCommitDiffByIDApi, action);

  console.log("diff resp  getCommitDiffByIDSaga fl", resp?.data);

  if (resp?.data?.length > 0) {
    yield put(updateCommitDiffByID(resp?.data));
  }
}

export default getCommitDiffByIDSaga;
