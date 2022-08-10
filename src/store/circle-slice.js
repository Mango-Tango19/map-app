import { createSlice } from "@reduxjs/toolkit";

const circleSlice = createSlice({
  name: "circle",
  initialState: {
    isCircleVisible: false,
    loading: true,
    error: false,
  },
  reducers: {
    setCurrentFloor(state, action) {
      state.currentFloor = action.payload;
    },
    setCurrentPlace(state, action) {
      state.userPlace = action.payload;
    },
    setCurrentUser(state, action) {
      state.userInfo = action.payload;
    },
    performRequest(state) {
      state.loading = true;
    },
    requestSuccess(state) {
      state.loading = false;
    },
    requestError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const circleActions = circleSlice.actions;

export default circleSlice;
