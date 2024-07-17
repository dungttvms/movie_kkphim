import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "./movieSlice";
import MovieCard from "./MovieCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import Pagination from "../../components/Pagination";

function MovieList() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const totalMovies = useSelector((state) => state.movie.pagination);

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
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography>CÓ {totalMovies} PHIM ĐÃ ĐƯỢC CẬP NHẬT</Typography>
            <Pagination page={page} setPage={setPage} />
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
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
            style={{ marginTop: "16px" }}
          >
            <Pagination page={page} setPage={setPage} />
          </Box>
        </>
      )}
    </Container>
  );
}

export default MovieList;
