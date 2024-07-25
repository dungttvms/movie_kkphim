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
  Container,
  Stack,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMovie } from "./movieSlice";
import LoadingScreen from "../../components/LoadingScreen";
import Logo from "../../components/Logo";
import NotFoundPage from "../../pages/NotFoundPage";
import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  TELEGRAM_URL,
  X_URL,
} from "../../app/config";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Helmet } from "react-helmet";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#333",
    color: "white",
  },
  media: {
    height: 500,
  },
  content: {
    backgroundColor: "#333333",
    color: "#ffffff",
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
    color: "orange",
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
    justifyItems: "space-around",
    flexWrap: "wrap",
    maxHeight: "200px",
    overflowY: "auto",
    margin: "10px",
  },
  episodeButton: {
    marginBottom: "10px",
    color: "green",
  },
  iconButton: {
    fontSize: "24px",
    margin: "0 8px",
    "&:hover": {
      opacity: 1,
    },
  },
  facebookIcon: {
    color: "#3B5998!important",
  },
  linkedInIcon: {
    color: "#0077B5 !important",
  },
  XIcon: {
    color: "#F5F8FA !important",
  },
  telegramIcon: {
    color: "#24A1DE !important",
  },
  copyIcon: {
    color: "#ffffff !important",
  },
  backgroundBox: {
    position: "relative",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.55)", // overlay color with 45% opacity
      zIndex: 1,
    },
  },
  contentContainer: {
    position: "relative",
    zIndex: 2,
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

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (slug) {
      dispatch(getSingleMovie({ slug }));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (singleMovieInfo) {
      const generatedShareUrl = `${window.location.origin}/phim/${singleMovieInfo.slug}`;
      setShareUrl(generatedShareUrl);
      console.log("Share URL:", generatedShareUrl);
    }
  }, [singleMovieInfo]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching single movie:", error);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!singleMovieInfo) {
    return (
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 15 }} />
        <NotFoundPage />
      </Stack>
    );
  }

  const shareFacebook = () => {
    const facebookShareUrl = `${FACEBOOK_URL}${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl, "_blank");
  };
  const shareLinkedIn = () => {
    const linkedInShareUrl = `${LINKEDIN_URL}${encodeURIComponent(shareUrl)}`;
    console.log(linkedInShareUrl);
    window.open(linkedInShareUrl, "_blank");
  };

  const shareTelegram = () => {
    const telegramShareUrl = `${TELEGRAM_URL}${encodeURIComponent(shareUrl)}`;
    window.open(telegramShareUrl, "_blank");
  };

  const shareX = () => {
    const XShareUrl = `${X_URL}${encodeURIComponent(shareUrl)}`;
    window.open(XShareUrl, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        console.log("Copied to clipboard successfully!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleEpisodeClick = (episode) => {
    window.open(episode.link_embed, "_blank");
  };

  return (
    <Box
      className={classes.backgroundBox}
      style={{ backgroundImage: `url(${singleMovieInfo.poster_url})` }}
    >
      <Container className={classes.contentContainer}>
        <Helmet>
          <title>{singleMovieInfo.name} | Phim Gia Lai</title>
          <meta property="og:title" content={singleMovieInfo.name} />
          <meta property="og:description" content={singleMovieInfo.content} />
          <meta property="og:image" content={singleMovieInfo.thumb_url} />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="website" />
        </Helmet>
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
                    {singleMoviePlayer.map((episode, index) =>
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
                <Box display="flex" flexWrap="wrap" sx={{ pl: 2, pt: 1 }}>
                  <IconButton
                    aria-label="share on Facebook"
                    onClick={shareFacebook}
                    className={`${classes.iconButton} ${classes.facebookIcon}`}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    aria-label="share on LinkedIn"
                    onClick={shareLinkedIn}
                    className={`${classes.iconButton} ${classes.linkedInIcon}`}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    aria-label="share on X"
                    onClick={shareX}
                    className={`${classes.iconButton} ${classes.XIcon}`}
                  >
                    <XIcon />
                  </IconButton>
                  <IconButton
                    aria-label="share on Telegram"
                    onClick={shareTelegram}
                    className={`${classes.iconButton} ${classes.telegramIcon}`}
                  >
                    <TelegramIcon />
                  </IconButton>
                  <IconButton
                    aria-label="copy link"
                    onClick={copyToClipboard}
                    className={`${classes.iconButton} ${classes.copyIcon}`}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
                <Typography variant="body1" sx={{ pl: 2, pt: 1 }}>
                  {singleMovieInfo.content}
                </Typography>
                <Box sx={{ pl: 2, pt: 1 }}>
                  <Typography variant="h6">Actors:</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {singleMovieInfo.actor.map((actor, index) => (
                      <Chip
                        key={index}
                        avatar={
                          <Avatar className={classes.actorAvatar}>
                            {actor.charAt(0)}
                          </Avatar>
                        }
                        label={actor}
                        className={classes.actorName}
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ pl: 2, pt: 1 }}>
                  <Typography variant="h6">Keywords:</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {singleMovieInfo.category.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword.name}
                        className={classes.keyword}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SingleMovie;
