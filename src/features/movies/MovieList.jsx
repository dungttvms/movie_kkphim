import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "./movieSlice.jsx";
import MovieCard from "./MovieCard.jsx";
import { Box, Container, Grid, Typography, Pagination } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen.jsx";
import { fNumber } from "../../utils/numberFormat.jsx";

function MovieList() {
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const {
    movies,
    pagination: totalMovies,
    isLoading: loading,
    error,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    const startPage = (page - 1) * 3 + 1;
    const pagesToFetch = [startPage, startPage + 1, startPage + 2];

    dispatch(getAllMovies({ pages: pagesToFetch }));
  }, [page, dispatch]);
  useEffect(() => {
    scrollToTop();
  }, [movies]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container ref={scrollRef}>
      {loading && <LoadingScreen />}
      {error && <p>Error: {error}</p>}
      {movies && (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            sx={{ backgroundColor: "#333333", borderRadius: 1 }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "orange",
                textAlign: "left",
              }}
            >
              CÓ {fNumber(totalMovies)} PHIM MỚI CẬP NHẬT
            </Typography>
            <Pagination
              count={Math.ceil(totalMovies / 30)}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              sx={{ color: "white" }}
            />
          </Box>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid
                key={movie._id}
                item
                xs={12}
                sm={6}
                md={3}
                lg={2.4}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(totalMovies / 30)}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default MovieList;
