import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Box, Stack } from "@mui/material";

function MainLayout() {
  const footerStyles = {
    flexShrink: 0,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  };

  // const leftAdBannerStyles = {
  //   position: "fixed",
  //   left: 0,
  //   top: "50%",
  //   transform: "translateY(-50%)",
  //   width: "100px", // Adjust width as needed
  //   height: "200px", // Adjust height as needed
  //   backgroundColor: "#f0f0f0", // Example background color
  //   zIndex: 1000, // Ensure it's above other content
  // };

  // const rightAdBannerStyles = {
  //   position: "fixed",
  //   right: 0,
  //   top: "50%",
  //   transform: "translateY(-50%)",
  //   width: "100px", // Adjust width as needed
  //   height: "200px", // Adjust height as needed
  //   backgroundColor: "#f0f0f0", // Example background color
  //   zIndex: 1000, // Ensure it's above other content
  // };

  return (
    <Stack sx={{ minHeight: "100vh", position: "relative" }}>
      {/* <Box sx={leftAdBannerStyles}>Left Ad Banner</Box>
      <Box sx={rightAdBannerStyles}>Right Ad Banner</Box> */}
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter sx={footerStyles} />
    </Stack>
  );
}

export default MainLayout;
