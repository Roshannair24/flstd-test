import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";

//reducers
import { increment } from "../reducers/counterReducer";
import { getCommitByID, getCommitDiffByID } from "../reducers/repoReducer";

// worker Saga
import testSaga from "./sagasCollection/testSaga";
import getCommitByIDSaga from "./sagasCollection/getCommitByIDSaga";
import getCommitDiffByIDSaga from "./sagasCollection/getCommitDiffByIDSaga";

function* mySaga() {
  yield all([
    yield takeLatest(increment, testSaga),
    yield takeLatest(getCommitByID, getCommitByIDSaga),

    yield takeLatest(getCommitDiffByID, getCommitDiffByIDSaga),
  ]);
}

export default mySaga;
