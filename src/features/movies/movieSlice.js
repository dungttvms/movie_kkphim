import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  movies: [],
  singleMovie: "",
  pagination: "",
};

const slice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllMoviesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload;
      state.movies = movies;
    },
    getSingleMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const singleMovie = action.payload;
      state.singleMovie = singleMovie;
    },
    getPhimLeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload;
      state.movies = movies;
    },
    getPhimBoSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload;
      state.movies = movies;
    },
    getPhimHoatHinhSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload;
      state.movies = movies;
    },
    getTVShowsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload;
      state.movies = movies;
    },
    getSearchMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload;
      state.movies = movies;
    },
  },
});

export const getAllMovies = ({ page }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams1 = new URLSearchParams({ page: page });
    const queryParams2 = new URLSearchParams({ page: page + 1 });

    const [response1, response2] = await Promise.all([
      apiService.get(`danh-sach/phim-moi-cap-nhat?${queryParams1.toString()}`),
      apiService.get(`danh-sach/phim-moi-cap-nhat?${queryParams2.toString()}`),
    ]);

    const combinedMovies = [...response1.items, ...response2.items];
    dispatch(slice.actions.getAllMoviesSuccess(combinedMovies));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPhimLe = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService.get(
      `v1/api/danh-sach/phim-le?${queryParams.toString()}`
    );
    dispatch(slice.actions.getPhimLeSuccess(response.data.items));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPhimBo = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService.get(
      `v1/api/danh-sach/phim-bo?${queryParams.toString()}`
    );
    dispatch(slice.actions.getPhimBoSuccess(response.data.items));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPhimHoatHinh = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService.get(
      `v1/api/danh-sach/hoat-hinh?${queryParams.toString()}`
    );
    dispatch(slice.actions.getPhimHoatHinhSuccess(response.data.items));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getTVShows = ({ page, limit }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService.get(
      `v1/api/danh-sach/tv-shows?${queryParams.toString()}`
    );
    dispatch(slice.actions.getTVShowsSuccess(response.data.items));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleMovie = ({ slug }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`phim/${slug}`);
    dispatch(slice.actions.getSingleMovieSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSearchMovie = ({ keyword }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`v1/api/tim-kiem?keyword=${keyword}`);
    dispatch(slice.actions.getSearchMovieSuccess(response.data.items));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
