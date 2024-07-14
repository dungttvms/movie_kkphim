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
  console.log("LOADING", loading);
  const error = useSelector((state) => state.movie.error);

  useEffect(() => {
    dispatch(getAllMovies({ page }));
  }, [page, dispatch]);

  return (
    <Container>
      {loading && <LoadingScreen />}
      {error && <p>Error: {error}</p>}
      {movies && (
        <>
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
          <Grid
            container
            spacing={2}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {movies?.map((movie) => (
              <Grid
                key={movie._id}
                item
                xs={12}
                sm={6}
                md={6}
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
        </>
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={() => setPage(page + 1)}>
          <ArrowForward />
        </IconButton>
      </Box>
    </Container>
  );
}

export default MovieList;
