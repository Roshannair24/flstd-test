import { createSlice } from "@reduxjs/toolkit";

export const repoSlice = createSlice({
  name: "repository",
  initialState: {
    value: "yooyoo",
    repoArr: [],
    repoDiffArr: [],
  },
  reducers: {
    getCommitByID: (state, action) => {},

    updateCommitByID: (state, action) => {
      state.repoArr = action.payload;
    },

    getCommitDiffByID: (state, action) => {},

    updateCommitDiffByID: (state, action) => {
      state.repoDiffArr = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCommitByID,
  updateCommitByID,
  getCommitDiffByID,
  updateCommitDiffByID,
} = repoSlice.actions;

export default repoSlice.reducer;
