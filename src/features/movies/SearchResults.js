import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { fToNow } from "../../utils/formatTime";
import { IMAGE_URL, NUMBER_OF_LIMIT } from "../../app/config";
import LoadingScreen from "../../components/LoadingScreen";
import { fNumber } from "../../utils/numberFormat";
import NotFoundPage from "../../pages/NotFoundPage";
import Logo from "../../components/Logo";
import { Helmet } from "react-helmet";
import SkipNextSharpIcon from "@mui/icons-material/SkipNextSharp";
import SkipPreviousSharpIcon from "@mui/icons-material/SkipPreviousSharp";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: "15px",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "transform 0.3s",
    },
  },
  media: {
    height: 60,
  },
  content: {
    backgroundColor: "#333",
    color: "white",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
  },
});

function SearchResults() {
  const { movies, isLoading, error } = useSelector((state) => state.movie);
  const totalMovies = useSelector((state) => state.movie.pagination || 0);
  const [page, setPage] = useState(0);
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const searchKeyword =
    new URLSearchParams(window.location.search).get("keyword") || "";

  const maxPage = Math.ceil(totalMovies / NUMBER_OF_LIMIT);

  const start = page * NUMBER_OF_LIMIT;
  const end = Math.min(start + Number(NUMBER_OF_LIMIT), totalMovies);

  const handleNextPage = () => {
    if (page < maxPage - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [page]);

  const paginatedMovies = movies.slice(start, end);

  if (isLoading) {
    return (
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 15 }} />
        <LoadingScreen />
      </Stack>
    );
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (movies.length === 0) {
    return (
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 15 }} />
        <NotFoundPage />
      </Stack>
    );
  }

  return (
    <Container sx={{ mt: 2 }} ref={scrollRef}>
      <Helmet>
        <title>Tìm kiếm | Phim Gia Lai</title>
      </Helmet>
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          p={1}
          sx={{ backgroundColor: "#333333", borderRadius: 1 }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "orange",
              textAlign: "center",
            }}
          >
            CÓ {fNumber(totalMovies)} PHIM CÓ TỪ KHÓA "
            {searchKeyword.toUpperCase()}" ĐƯỢC TÌM THẤY
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevPage}
            disabled={page === 0}
            sx={{ minWidth: 40, minHeight: 40 }}
          >
            <SkipPreviousSharpIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={page >= maxPage - 1}
            sx={{ minWidth: 40, minHeight: 40 }}
          >
            <SkipNextSharpIcon />
          </Button>
        </Stack>
        <Card sx={{ p: 3, backgroundColor: "#333333" }}>
          <Box sx={{ overflowX: "auto", backgroundColor: "#333333" }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: { xs: "70%", md: "25%" },
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "yellow",
                      }}
                    >
                      Tên phim
                    </TableCell>
                    {!isMobile && (
                      <>
                        <TableCell
                          sx={{
                            width: { xs: "none", md: "10%" },
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "yellow",
                          }}
                        >
                          Tình trạng
                        </TableCell>
                        <TableCell
                          sx={{
                            width: { xs: "none", md: "10%" },
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "yellow",
                          }}
                        >
                          Thời lượng
                        </TableCell>
                        <TableCell
                          sx={{
                            width: { xs: "none", md: "10%" },
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "yellow",
                          }}
                        >
                          Chất lượng
                        </TableCell>
                        <TableCell
                          sx={{
                            width: { xs: "none", md: "10%" },
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "yellow",
                          }}
                        >
                          Ngôn ngữ
                        </TableCell>
                        <TableCell
                          sx={{
                            width: { xs: "none", md: "10%" },
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "yellow",
                          }}
                        >
                          Quốc gia
                        </TableCell>
                        <TableCell
                          sx={{
                            width: { xs: "none", md: "10%" },
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "yellow",
                          }}
                        >
                          Ngày cập nhật
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedMovies.map((movie) => (
                    <TableRow key={movie._id} hover>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <CardMedia
                          className={classes.media}
                          image={`${IMAGE_URL}${movie.thumb_url}`}
                          sx={{ width: 60, height: 60, marginRight: 2 }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            textDecoration: "none",
                            color: "white",
                          }}
                          component={RouterLink}
                          to={`/phim/${movie.slug}`}
                        >
                          {movie.name} - {movie.year}
                        </Typography>
                      </TableCell>
                      {!isMobile && (
                        <>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {movie.episode_current || "N/A"}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {movie.time || "N/A"}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {movie.quality || "N/A"}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {movie.lang || "N/A"}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {movie.country?.[0]?.name || "N/A"}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {fToNow(movie.modified?.time)}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevPage}
            disabled={page === 0}
            sx={{ minWidth: 40, minHeight: 40 }}
          >
            <SkipPreviousSharpIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={page >= maxPage - 1}
            sx={{ minWidth: 40, minHeight: 40 }}
          >
            <SkipNextSharpIcon />
          </Button>
        </Stack>
      </>
    </Container>
  );
}

export default SearchResults;
