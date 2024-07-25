import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
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
import { IMAGE_URL } from "../../app/config";
import LoadingScreen from "../../components/LoadingScreen";
import { fNumber } from "../../utils/numberFormat";
import NotFoundPage from "../../pages/NotFoundPage";
import Logo from "../../components/Logo";
import { Helmet } from "react-helmet";

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
  const total = useSelector((state) => state.movie.pagination);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Lấy từ khóa tìm kiếm từ URL query string
  const searchKeyword = new URLSearchParams(window.location.search).get(
    "keyword"
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  // Kiểm tra nếu không có kết quả tìm kiếm
  if (movies.length === 0) {
    return (
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 15 }} />
        <NotFoundPage />
      </Stack>
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Helmet>
        <title>Tìm kiếm | PHIM GIA LAI</title>
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
            CÓ {fNumber(total)} PHIM CÓ TỪ KHÓA "{searchKeyword}" ĐƯỢC TÌM THẤY
          </Typography>
        </Box>
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
                  {movies.map((movie) => (
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
                          image={`${IMAGE_URL}${movie.poster_url}`}
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
      </>
    </Container>
  );
}

export default SearchResults;
