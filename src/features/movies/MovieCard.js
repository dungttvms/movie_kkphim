import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    margin: "5px",
    position: "relative",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "transform 0.3s",
    },
    "&:hover $playIcon": {
      opacity: 1,
    },
  },
  media: {
    height: 250,
  },
  content: {
    backgroundColor: "#333",
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: "0.65rem",
  },
  subtitle: {
    color: "#aaa",
    fontSize: "0.625rem",
  },
  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0,
    transition: "opacity 0.3s",
    color: "white",
    fontSize: "5rem",
    zIndex: 1,
  },
  qualityTag: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#ff0000",
    color: "white",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    zIndex: 2,
  },
});

function MovieCard({ movie }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/phim/${movie.slug}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <Box className={classes.playIcon}>
          <PlayArrowIcon fontSize="inherit" />
        </Box>
        <CardMedia
          className={classes.media}
          image={movie.poster_url}
          title={movie.origin_name}
        />
        <Box className={classes.qualityTag}>{movie.year}</Box>
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="h6">
            {movie.name.length > 25
              ? `${movie.name.substring(0, 25)}...`
              : movie.name}
          </Typography>

          <Typography className={classes.subtitle} variant="subtitle1">
            {movie.origin_name.length > 30
              ? `${movie.origin_name.substring(0, 30)}...`
              : movie.origin_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
