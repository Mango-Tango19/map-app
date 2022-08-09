import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: {
    currentFloor: null,
    userPlace: null,
    userInfo: null,
    loading: true,
    error: false,
  },
  reducers: {
    setCurrentFloor(state, action) {
      state.currentFloor = action.payload;
    },
    setCurrentUser(state, action) {
      state.userPlace = action.payload;
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

export const floorActions = floorSlice.actions;

export default floorSlice;
