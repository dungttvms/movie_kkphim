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
        <title>Trang chủ | Phim Gia Lai</title>
        <meta property="og:url" content="https://phimgialai.netlify.app/" />
        <meta property="og:title" content="Bring cinema to your home" />
        <meta
          property="og:image"
          content="https://www.canva.com/design/DAGL77WyiQ4/ATFUCPOiVT55wZ926-89Tw/edit?utm_content=DAGL77WyiQ4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
        />
        <meta
          property="og:description"
          content="Phim Gia Lai - Mang tạp chiếu phim vào gia đình của bạn"
        />
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
