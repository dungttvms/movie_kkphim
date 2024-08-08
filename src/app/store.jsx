import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";

const rootReducer = {
  movie: movieReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});

export default store;
