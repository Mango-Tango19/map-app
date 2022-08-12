import { configureStore } from "@reduxjs/toolkit";
import userCardSlice from "./user-slice";
import floorSlice from "./floor-slice";
import homeSlice from "./home-slice";

const store = configureStore({
  reducer: {
    userCircle: userCardSlice.reducer,
    floor: floorSlice.reducer,
    home: homeSlice.reducer,
  },
});

export default store;
