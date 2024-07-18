import React from "react";
import { Box, Container } from "@mui/material";
import { Helmet } from "react-helmet";
import CellPhone from "../components/CellPhone";
import CustomChatBot from "../components/ChatBot";
import MovieList from "../features/movies/MovieList";

function HomePage() {
  return (
    <Container
      maxWidth="false"
      style={{
        padding: 0,
        margin: 0,

        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>Trang chủ | HAUSNEO MOVIE</title>
      </Helmet>
      <MovieList />

      <Box>
        <CellPhone />
        <CustomChatBot />
      </Box>
    </Container>
  );
}

export default HomePage;
