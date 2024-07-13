import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";

const rootReducer = {
  movie: movieReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
