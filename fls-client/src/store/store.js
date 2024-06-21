import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterReducer";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas/sagas";
import repoReducer from "../reducers/repoReducer";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    counter: counterReducer,
    repository: repoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(mySaga);

export default store;
