import { createSlice } from "@reduxjs/toolkit";

const userCardSlice = createSlice({
  name: "user",
  initialState: {
    isCircleVisible: false,
    loading: false,
    error: false,
    userData: null,
  },
  reducers: {
    getUserById: (state, action) => {
      return { ...state, userData: action.payload };
    },

    showUserCircle: (state) => {
      return { ...state, isCircleVisible: true };
    },

    hideUserCircle: (state) => {
      return { ...state, isCircleVisible: false };
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

export const userActions = userCardSlice.actions;
export default userCardSlice;
