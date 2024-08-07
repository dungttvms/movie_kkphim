import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import SingleMovie from "../features/movies/SingleMovie";
import PhimLe from "../features/movies/PhimLe";
import PhimBo from "../features/movies/PhimBo";
import PhimHoatHinh from "../features/movies/PhimHoatHinh";
import TVShows from "../features/movies/TVShows";
import SearchResults from "../features/movies/SearchResults";
import BlankLayout from "../layouts/BlankLayout";
import MovieByGenre from "../features/movies/MovieByGenre";
import MovieByCountry from "../features/movies/MovieByCountry";
import LoginPage from "../pages/LoginPage";
// import LoginPage from "../pages/LoginPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/phim/:slug" element={<SingleMovie />} />
        <Route path="/phim-le" element={<PhimLe />} />
        <Route path="/phim-bo" element={<PhimBo />} />
        <Route path="/hoat-hinh" element={<PhimHoatHinh />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tim-kiem" element={<SearchResults />} />
        <Route path="/the-loai/:slug" element={<MovieByGenre />} />
        <Route path="/quoc-gia/:slug" element={<MovieByCountry />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default Router;
