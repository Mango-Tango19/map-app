import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: {
    currentFloor: null,
  },
  reducers: {
    setCurrentFloor(state, action) {
      state.currentFloor = action.payload;
    },
  },
});

export const floorActions = floorSlice.actions;
export default floorSlice;
