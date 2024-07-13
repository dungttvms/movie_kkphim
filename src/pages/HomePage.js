import React from "react";
import { Box, Container, Stack } from "@mui/material";
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
        <title>Trang chủ | Chợ đất Tây Nguyên</title>
      </Helmet>
      <MovieList />
      <Box>
        <CellPhone />
        <CustomChatBot />
      </Box>
      <Stack style={{ mt: 10 }}>
        <Box sx={{ m: 3, padding: 3, borderRadius: "4px" }}>
          <Box sx={{ marginTop: 3, marginBottom: 3 }}></Box>
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
