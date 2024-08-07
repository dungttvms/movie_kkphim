import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  Box,
  Container,
  Stack,
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  useTheme,
  CardMedia,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPhimBo } from "./movieSlice.jsx";
import LoadingScreen from "../../components/LoadingScreen.jsx";
import { fToNow } from "../../utils/formatTime.jsx";
import { IMAGE_URL } from "../../app/config.jsx";
import { fNumber } from "../../utils/numberFormat.jsx";
import { Helmet } from "react-helmet";
import Logo from "../../components/Logo.jsx";

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

function PhimBo() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const scrollRef = useRef(null);

  const { movies, pagination: total, isLoading: loading, error } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(getPhimBo({ page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatch]);

  useEffect(() => {
    scrollToTop();
  }, [movies]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container sx={{ mt: 2 }} ref={scrollRef}>
      <Helmet>
        <title>Phim Bộ | Phim Gia Lai</title>
      </Helmet>
      {movies.length > 0 ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            sx={{ backgroundColor: "#000000", borderRadius: 1 }}
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
              CÓ {fNumber(total)} PHIM BỘ ĐƯỢC TÌM THẤY
            </Typography>
          </Box>
          <Card sx={{ p: 1, backgroundColor: "#333333" }}>
            <Stack spacing={2}>
              <Stack spacing={2} direction="column" alignItems="center">
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
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 20, 30, 40, 50]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Số lượng Phim / Trang"
                />
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
                    {movies.map((movie) => {
                      const imageUrl = `${IMAGE_URL}${movie.thumb_url}`;

                      return (
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
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Stack spacing={2}>
              <Stack spacing={2} direction="column" alignItems="center">
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
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 20, 30, 40, 50]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Số lượng Phim / Trang"
                />
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

export default PhimBo;
