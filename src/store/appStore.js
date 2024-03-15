import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./resumeSlice";
import loaderSlice from "./loaderSlice";
import navigationSlice from "./navigationSlice";

const appStore = configureStore({
  reducer: {
    resume: resumeReducer,
    loader: loaderSlice,
    navigator: navigationSlice,
  },
});

export default appStore;
