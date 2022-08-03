import { configureStore } from "@reduxjs/toolkit";
import userCircleSlice from "./user-slice";

const store = configureStore({
  reducer: {
    userCircle: userCircleSlice.reducer,
  },
});

export default store;
