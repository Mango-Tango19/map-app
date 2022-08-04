import { createSlice } from "@reduxjs/toolkit";

const userCircleSlice = createSlice({
  name: "userCircleSlice",
  initialState: {
    isCircleVisible: false,
    isLoading: false,
    isError: false,
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
  },
});

export const actions = userCircleSlice.actions;
export default userCircleSlice;
