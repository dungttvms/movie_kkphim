import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiService1, apiService2 } from "../../app/apiService";
import { NUMBER_OF_LIMIT } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  movies: [],
  singleMovie: "",
  pagination: "",
  genres: [],
  countries: [],
  totalViewers: "",
  filteredCountryMovies: [],
  filteredGenreMovies: [],
  totalFilteredMovies: "",
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
      state.movies = action.payload.movies;
      state.pagination = action.payload.totalMovies;
    },
    getSingleMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.singleMovie = action.payload;
    },
    getPhimLeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
      state.pagination = action.payload.totalMovies;
    },
    getPhimBoSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
      state.pagination = action.payload.totalMovies;
    },
    getPhimHoatHinhSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
      state.pagination = action.payload.totalMovies;
    },
    getTVShowsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
      state.pagination = action.payload.totalMovies;
    },
    getSearchMovieSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.movies = action.payload.movies;
      state.pagination = action.payload.totalMovies;
    },
    getViewerCountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalViewers = action.payload;
    },
    getCountriesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.countries = action.payload;
    },
    getFilteredCountryMoviesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filteredCountryMovies = action.payload.items;
      state.totalFilteredMovies = action.payload.params.pagination;
    },
    getGenreSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.genres = action.payload;
    },
    getFilteredGenreMoviesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filteredGenreMovies = action.payload.items;
      state.totalFilteredMovies = action.payload.params.pagination;
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

    const totalMovies = responses[0].pagination.totalItems;

    dispatch(
      slice.actions.getAllMoviesSuccess({ movies: combinedMovies, totalMovies })
    );
    toast.success("Load All Movies Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getGenres = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get("the-loai");
    dispatch(slice.actions.getGenreSuccess(response));
    // console.log(response);
    // toast.success(`Load movie ${response.movie.name} success`);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getCountries = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService1.get("quoc-gia");
    dispatch(slice.actions.getCountriesSuccess(response));

    // toast.success(`Load movie ${response.movie.name} success`);
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
    toast.success("Load all single movies success");
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
    dispatch(slice.actions.getPhimBoSuccess({ movies, totalMovies }));
    toast.success("Load all serie movies success");
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
    dispatch(slice.actions.getPhimHoatHinhSuccess({ movies, totalMovies }));
    toast.success("Load all cartoon movies success");
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
    dispatch(slice.actions.getTVShowsSuccess({ movies, totalMovies }));
    toast.success("Load all TV Shows success");
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
    toast.success(`Load movie ${response.movie.name} success`);
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
    toast.success(`Load all movies with keyword "${keyword}" success`);
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

export const getFilteredCountryMovies = ({ slug, page, limit }) => async (
  dispatch
) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: NUMBER_OF_LIMIT,
    });
    const response = await apiService1.get(
      `v1/api/quoc-gia/${slug}?${queryParams.toString()}`
    );

    dispatch(slice.actions.getFilteredCountryMoviesSuccess(response.data));
    toast.success(`Load country movies successful`);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getFilteredGenreMovies = ({ slug, page, limit }) => async (
  dispatch
) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: NUMBER_OF_LIMIT,
    });
    const response = await apiService1.get(
      `v1/api/the-loai/${slug}?${queryParams.toString()}`
    );

    dispatch(slice.actions.getFilteredGenreMoviesSuccess(response.data));
    toast.success(`Load genre movies successful`);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
