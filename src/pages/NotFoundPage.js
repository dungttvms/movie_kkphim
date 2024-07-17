import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <Container>
      <Helmet>
        <title>Not Found Page | Hausneo Movie</title>
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" align="center">
          404 - Page Not Found
        </Typography>
        <Typography align="center" marginBottom={3}>
          Sorry, the movie you are looking for does not exist.
        </Typography>
        <Button variant="contained" component={NavLink} to="/">
          Quay về Trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
