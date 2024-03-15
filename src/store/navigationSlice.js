import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    navigation: 0,
  },
  reducers: {
    nextNavigation: (state, action) => {
      state.navigation = action.payload;
    },
  },
});

export const { nextNavigation } = navigationSlice.actions;

export default navigationSlice.reducer;
