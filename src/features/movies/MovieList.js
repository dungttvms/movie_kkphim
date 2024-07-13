import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "./movieSlice";
import MovieCard from "./MovieCard";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import LoadingScreen from "../../components/LoadingScreen";

function MovieList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const loading = useSelector((state) => state.movie.isLoading);
  const error = useSelector((state) => state.movie.error);

  useEffect(() => {
    dispatch(getAllMovies({ page }));
  }, [page, dispatch]);

  return (
    <Container>
      {loading && <LoadingScreen />}
      {error && <p>Error: {error}</p>}
      {movies && (
        <Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography>PHIM MỚI CẬP NHẬT</Typography>
            <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
              <ArrowBack />
            </IconButton>
            <IconButton onClick={() => setPage(page + 1)}>
              <ArrowForward />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {movies?.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Typography>
      )}
      <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        <ArrowBack />
      </IconButton>
      <IconButton onClick={() => setPage(page + 1)}>
        <ArrowForward />
      </IconButton>
    </Container>
  );
}

export default MovieList;
