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

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/phim/:slug" element={<SingleMovie />} />
        <Route path="/phim-le" element={<PhimLe />} />
        <Route path="/phim-bo" element={<PhimBo />} />
        <Route path="/hoat-hinh" element={<PhimHoatHinh />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tim-kiem" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default Router;
