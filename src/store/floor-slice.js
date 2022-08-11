import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: {
    currentFloor: 2,
    userPlace: null,
    userInfo: null,
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

export const floorActions = floorSlice.actions;

export default floorSlice;
