import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Link,
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
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { fDate } from "../../utils/formatTime";
import { IMAGE_URL } from "../../app/config";
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
    color: "#aaa",
  },
});
function SearchResults() {
  const { movies, isLoading, error } = useSelector((state) => state.movie);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      {movies.length > 0 ? (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            KẾT QUẢ TÌM KIẾM
          </Typography>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack spacing={2} direction="column" alignItems="center">
                <TablePagination
                  sx={{
                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                      display: { xs: "none", md: "block" },
                    },
                  }}
                  component="div"
                  // count={total}
                  // page={page}
                  //   onPageChange={handleChangePage}
                  //   rowsPerPage={rowsPerPage}
                  //   rowsPerPageOptions={[20, 30, 50]}
                  //   onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Stack>
            </Stack>
            <Box sx={{ overflowX: "auto" }}>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          width: { xs: "70%", md: "25%" },
                          fontWeight: "bold",
                          textAlign: "center",
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
                            }}
                          >
                            Tình trạng
                          </TableCell>
                          <TableCell
                            sx={{
                              width: { xs: "none", md: "10%" },
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Chất lượng
                          </TableCell>
                          <TableCell
                            sx={{
                              width: { xs: "none", md: "10%" },
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Ngôn ngữ
                          </TableCell>
                          <TableCell
                            sx={{
                              width: { xs: "none", md: "10%" },
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Quốc gia
                          </TableCell>
                          <TableCell
                            sx={{
                              width: { xs: "none", md: "10%" },
                              fontWeight: "bold",
                              textAlign: "center",
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
                            sx={{ width: 60, height: 60, marginRight: 2 }} // Adjust size and margin as needed
                          />
                          <Link
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                            component={RouterLink}
                            to={`/phim/${movie.slug}`}
                          >
                            {movie.name} - {movie.year}
                          </Link>
                        </TableCell>
                        {!isMobile && (
                          <>
                            <TableCell align="center">
                              {movie.episode_current || "N/A"}
                            </TableCell>
                            <TableCell align="center">
                              {movie.quality || "N/A"}
                            </TableCell>
                            <TableCell align="center">
                              {movie.lang || "N/A"}
                            </TableCell>
                            <TableCell align="center">
                              {movie.country?.[0]?.name || "N/A"}
                            </TableCell>
                            <TableCell align="center">
                              {fDate(movie.modified?.time)}
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
      ) : (
        <Typography variant="subtitle1">Không có kết quả tìm kiếm</Typography>
      )}
    </Container>
  );
}

export default SearchResults;
