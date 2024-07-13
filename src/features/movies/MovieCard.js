import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

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
    height: 250,
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

function MovieCard({ movie }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/phim/${movie.slug}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.media}
          image={movie.poster_url}
          title={movie.origin_name}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="h8">
            {movie.name}
          </Typography>
          <Typography className={classes.subtitle} variant="subtitle1">
            {movie.origin_name.length > 30
              ? `${movie.origin_name.substring(0, 30)}...`
              : movie.origin_name}
          </Typography>

          <Typography className={classes.subtitle} variant="subtitle2">
            {movie.year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
