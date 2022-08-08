import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isError: false,
    currentFloor: null,
  },
  reducers: {
    setCurrentFloor(state, action) {
      state.currentFloor = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
