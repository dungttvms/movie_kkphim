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
        <title>Not Found Page | Phim Gia Lai</title>
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" align="center" color="#ffffff">
          Trang không tìm thấy (Error 404)
        </Typography>
        <Typography align="center" marginBottom={3} color="#ffffff">
          Xin lỗi, phim bạn đang tìm kiếm không tồn tại
        </Typography>
        <Button variant="contained" component={NavLink} to="/">
          Quay về Trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
