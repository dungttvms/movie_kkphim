import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiService1, apiService2 } from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  movies: [],
  singleMovie: "",
  pagination: "",
  totalViewers: "",
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
      const movies = action.payload.movies;
      state.movies = movies;
      const totalMovies = action.payload.totalMovies;
      state.pagination = totalMovies;
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
      const movies = action.payload.movies;
      state.movies = movies;
      const totalMovies = action.payload.totalMovies;
      state.pagination = totalMovies;
    },
    getPhimBoSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload.movies;
      state.movies = movies;
      const totalMovies = action.payload.totalMovies;
      state.pagination = totalMovies;
    },
    getPhimHoatHinhSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload.movies;
      state.movies = movies;
      const totalMovies = action.payload.totalMovies;
      state.pagination = totalMovies;
    },
    getTVShowsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload.movies;
      state.movies = movies;
      const totalMovies = action.payload.totalMovies;
      state.pagination = totalMovies;
    },
    getSearchMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const movies = action.payload.movies;
      state.movies = movies;
      const totalMovies = action.payload.totalMovies;
      state.pagination = totalMovies;
    },
    getViewerCountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalViewers = action.payload;
    },
  },
});

export const getAllMovies = ({ pages }) => async (dispatch, getState) => {
  dispatch(slice.actions.startLoading());
  try {
    const requests = pages.map((page) => {
      const queryParams = new URLSearchParams({ page });
      return apiService1.get(
        `danh-sach/phim-moi-cap-nhat?${queryParams.toString()}`
      );
    });

    const responses = await Promise.all(requests);
    const combinedMovies = responses.reduce((acc, response) => {
      return acc.concat(response.items);
    }, []);

    const totalMovies = responses[0].pagination.totalItems; // Assuming totalItems is the same for all pages

    dispatch(
      slice.actions.getAllMoviesSuccess({ movies: combinedMovies, totalMovies })
    );
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
    const response = await apiService1.get(
      `v1/api/danh-sach/phim-le?${queryParams.toString()}`
    );
    const movies = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getPhimLeSuccess({ movies, totalMovies }));
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
    const response = await apiService1.get(
      `v1/api/danh-sach/phim-bo?${queryParams.toString()}`
    );
    const movies = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getPhimLeSuccess({ movies, totalMovies }));
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
    const response = await apiService1.get(
      `v1/api/danh-sach/hoat-hinh?${queryParams.toString()}`
    );
    const movies = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getPhimLeSuccess({ movies, totalMovies }));
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
    const response = await apiService1.get(
      `v1/api/danh-sach/tv-shows?${queryParams.toString()}`
    );
    const movies = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getPhimLeSuccess({ movies, totalMovies }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleMovie = ({ slug }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get(`phim/${slug}`);
    dispatch(slice.actions.getSingleMovieSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSearchMovie = ({ keyword }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get(
      `v1/api/tim-kiem?keyword=${keyword}`
    );
    const movies = response.data.items;
    const totalMovies = response.data.params.pagination.totalItems;
    dispatch(slice.actions.getSearchMovieSuccess({ movies, totalMovies }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getViewerCount = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService2.get(`/viewerCounts`);

    dispatch(slice.actions.getViewerCountSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
