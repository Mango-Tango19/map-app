import { configureStore } from "@reduxjs/toolkit";
import userCircleSlice from "./user-slice";
import floorSlice from "./floor-slice";

const store = configureStore({
  reducer: {
    userCircle: userCircleSlice.reducer,
    floor: floorSlice.reducer,
  },
});

export default store;
