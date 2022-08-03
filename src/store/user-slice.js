import { createSlice } from "@reduxjs/toolkit";

const userCircleSlice = createSlice({
  name: "userCircleSlice",
  initialState: { isCircleVisible: false, userData: null },
  reducers: {
    showUserCircle: (state) => {
      return { ...state, isCircleVisible: true };
    },

    hideUserCircle: (state) => {
      return { ...state, isCircleVisible: false };
    },

    setUserData: (state, action) => {
      return { ...state, userData: action.payload };
    },
  },
});

export const actions = userCircleSlice.actions;
export default userCircleSlice;
