import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    count: 0,
  },
  reducers: {
    increaseCount: (state) => {
      state.count = state.count + 1;
    },
    decreaseCount: (state) => {
      if (state.count > 0) {
        state.count = state.count - 1;
      }
    },
  },
});

export const { increaseCount, decreaseCount } = loaderSlice.actions;

export default loaderSlice.reducer;
