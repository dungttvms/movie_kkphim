import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";

import { IMAGE_URL, NUMBER_OF_LIMIT } from "../../app/config";
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
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";
import { fToNow } from "../../utils/formatTime";
import Logo from "../../components/Logo";

import { getFilteredCountryMovies } from "./movieSlice";
import { fNumber } from "../../utils/numberFormat";
import LoadingScreen from "../../components/LoadingScreen";

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
    color: "#ffffff",
  },
});

const tablePaginationStyles = {
  rootBgColor: "#ffffff",
  rootTextColor: "#ffffff",
  toolbarBgColor: "#333333",
  actionColor: "#ffffff",
  selectBgColor: "#333",
  selectColor: "#ffffff",
  inputColor: "#ffffff",
  displayedRowsColor: "#ffffff",
};

function MovieByCountry() {
  const { slug } = useParams();
  const location = useLocation();
  const countryName = location.state.countryName;
  const [page, setPage] = useState(0); // Page should start at 0
  const [rowsPerPage, setRowsPerPage] = useState(NUMBER_OF_LIMIT);
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollRef = useRef(null);
  const filteredCountryMovies = useSelector(
    (state) => state.movie.filteredCountryMovies
  );
  const total = useSelector(
    (state) => state.movie.totalFilteredMovies.totalItems
  );
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [page]);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage); // Directly set the new page
  }, []);

  useEffect(() => {
    // Ensure the API request is correct
    dispatch(
      getFilteredCountryMovies({
        slug,
        page: page + 1,
        limit: rowsPerPage,
        countryName,
      })
    );
  }, [slug, page, rowsPerPage, countryName, dispatch]);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, NUMBER_OF_LIMIT));
    setPage(0);
  }, []);

  const renderTableCells = (movie) => {
    const imageUrl = `${IMAGE_URL}${movie.thumb_url}`;
    return (
      <>
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <CardMedia
            className={classes.media}
            image={imageUrl}
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
            {movie.name}
          </Typography>
        </TableCell>
        {!isMobile && (
          <>
            <TableCell align="center" sx={{ color: "white" }}>
              {movie.year || "N/A"}
            </TableCell>
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
              {fToNow(movie.modified?.time)}
            </TableCell>
          </>
        )}
      </>
    );
  };

  const renderTablePagination = () =>
    total > NUMBER_OF_LIMIT && (
      <TablePagination
        sx={{
          "& .MuiTablePagination-root": {
            backgroundColor: tablePaginationStyles.rootBgColor,
            color: tablePaginationStyles.rootTextColor,
          },
          "& .MuiTablePagination-toolbar": {
            backgroundColor: tablePaginationStyles.toolbarBgColor,
          },
          "& .MuiTablePagination-actions": {
            color: tablePaginationStyles.actionColor,
          },
          "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
            display: { xs: "none", md: "block" },
            color: tablePaginationStyles.selectColor,
          },
          "& .MuiTablePagination-input": {
            color: tablePaginationStyles.inputColor,
          },
          "& .MuiTablePagination-select": {
            backgroundColor: tablePaginationStyles.selectBgColor,
          },
          "& .MuiTablePagination-displayedRows": {
            color: tablePaginationStyles.displayedRowsColor,
          },
        }}
        component="div"
        count={total}
        page={page} // Page now correctly starts from 0
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[20, 25, 30]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số lượng Phim / Trang"
      />
    );

  return (
    <Container sx={{ mt: 2 }} ref={scrollRef}>
      <Helmet>
        <title>Phim {countryName} | Phim Gia Lai</title>
      </Helmet>
      {filteredCountryMovies.length > 0 ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            sx={{ backgroundColor: "#333333", borderRadius: 1 }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "orange",
              textAlign: "center",
            }}
          >
            CÓ {fNumber(total)} PHIM {countryName.toUpperCase()} ĐƯỢC TÌM THẤY
          </Typography>
          <Card sx={{ p: 1, backgroundColor: "#333333" }}>
            <Stack spacing={2}>
              <Stack spacing={2} direction="column" alignItems="center">
                {renderTablePagination()}
              </Stack>
            </Stack>
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
                            Năm sản xuất
                          </TableCell>
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
                            Ngày cập nhật
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCountryMovies.map((movie) => (
                      <TableRow key={movie._id} hover>
                        {renderTableCells(movie)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Stack spacing={2}>
              <Stack spacing={2} direction="column" alignItems="center">
                {renderTablePagination()}
              </Stack>
            </Stack>
          </Card>
        </>
      ) : (
        <Stack minHeight="100vh" justifyContent="center" alignItems="center">
          <Logo sx={{ width: 300, height: 200, mb: 15 }} />
          <LoadingScreen />
        </Stack>
      )}
    </Container>
  );
}

export default React.memo(MovieByCountry);
