import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Avatar,
  Pagination,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMovie } from "./movieSlice";
import LoadingScreen from "../../components/LoadingScreen";

const useStyles = makeStyles({
  root: {
    // margin: "20px",
    backgroundColor: "#333",
    color: "white",
  },
  media: {
    height: 500,
  },
  content: {
    backgroundColor: "#333",
    color: "white",
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#aaa",
  },
  button: {
    width: "100%",
  },
  actorAvatar: {
    backgroundColor: "#555",
    color: "white",
    marginRight: "10px",
  },
  actorName: {
    color: "white",
  },
  keyword: {
    marginRight: "10px",
    marginBottom: "10px",
    color: "white",
  },
  episodesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: "200px",
    overflowY: "auto",
    marginTop: "10px",
  },
  episodeButton: {
    // marginRight: "10px",
    marginBottom: "10px",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
});

function SingleMovie() {
  const { slug } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const singleMovieInfo = useSelector((state) => state.movie.singleMovie.movie);
  const singleMoviePlayer = useSelector(
    (state) => state.movie.singleMovie.episodes
  );
  const isLoading = useSelector((state) => state.movie.isLoading);
  const error = useSelector((state) => state.movie.error);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    dispatch(getSingleMovie({ slug }));
  }, [slug, dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching single movie:", error);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!singleMovieInfo) {
    return <Typography>No movie data available</Typography>;
  }

  const handleEpisodeClick = (episode) => {
    window.open(episode.link_embed, "_blank");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEpisodes = singleMoviePlayer.slice(startIndex, endIndex);
  const totalPages = Math.ceil(singleMoviePlayer.length / itemsPerPage);

  return (
    <Container>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CardMedia
                className={classes.media}
                image={singleMovieInfo.thumb_url}
                title={singleMovieInfo.origin_name}
              />
              <Box p={2} alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  href={singleMovieInfo.trailer_url}
                  target="_blank"
                  className={classes.button}
                >
                  Trailer
                </Button>
                <Box className={classes.episodesContainer}>
                  {currentEpisodes.map((episode, index) =>
                    episode.server_data.map((data, dataIndex) => (
                      <Button
                        key={`${index}-${dataIndex}`}
                        variant="contained"
                        color="secondary"
                        className={classes.episodeButton}
                        onClick={() => handleEpisodeClick(data)}
                      >
                        {data.name}
                      </Button>
                    ))
                  )}
                </Box>
                <Box className={classes.paginationContainer}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                className={classes.title}
                sx={{ pl: 2, pt: 2 }}
              >
                {singleMovieInfo.name}
              </Typography>

              <Typography
                variant="h6"
                className={classes.subtitle}
                sx={{ pl: 2, pt: 1 }}
              >
                {singleMovieInfo.origin_name} ({singleMovieInfo.year})
              </Typography>
              <Box my={2}>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Trạng thái:</strong> {singleMovieInfo.episode_current}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Đạo diễn:</strong> {singleMovieInfo.director}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Quốc gia:</strong> {singleMovieInfo.country[0].name}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Năm sản xuất:</strong> {singleMovieInfo.year}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Tổng số tập:</strong> {singleMovieInfo.episode_total}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Thời lượng:</strong> {singleMovieInfo.time}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Chất lượng:</strong> {singleMovieInfo.quality}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Ngôn ngữ:</strong> {singleMovieInfo.lang}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Thể loại:</strong>{" "}
                  {singleMovieInfo.type === "series"
                    ? "Phim bộ"
                    : singleMovieInfo.type === "single"
                    ? "Phim lẻ"
                    : singleMovieInfo.type === "hoathinh"
                    ? "Phim hoạt hình"
                    : "Chương trình giải trí"}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  <strong>Lượt xem:</strong> {singleMovieInfo.view}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                className={classes.title}
                sx={{ pl: 2, pt: 1 }}
              >
                Diễn viên
              </Typography>
              <Box display="flex" flexWrap="wrap" my={2} sx={{ pl: 2, pt: 1 }}>
                {singleMovieInfo.actor.map((actor) => (
                  <Chip
                    key={actor}
                    avatar={
                      <Avatar className={classes.actorAvatar}>
                        {actor.charAt(0)}
                      </Avatar>
                    }
                    label={actor}
                    className={classes.keyword}
                    sx={{ color: "white" }}
                  />
                ))}
              </Box>
              <Typography
                variant="h5"
                className={classes.title}
                sx={{ pl: 2, pt: 1 }}
              >
                Nội dung phim
              </Typography>
              <Typography variant="body1" paragraph sx={{ pl: 2, pt: 1 }}>
                {singleMovieInfo.content}
              </Typography>
              <Typography
                variant="h5"
                className={classes.title}
                sx={{ pl: 2, pt: 1 }}
              >
                Từ khóa
              </Typography>
              <Box display="flex" flexWrap="wrap" className={classes.keyword}>
                {[
                  singleMovieInfo.name,
                  ...singleMovieInfo.country.map((country) => country.name),
                  singleMovieInfo.lang,
                  singleMovieInfo.year,
                  ...singleMovieInfo.category.map((cat) => cat.name),
                ].map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    className={classes.keyword}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SingleMovie;
