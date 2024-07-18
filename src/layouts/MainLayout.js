import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Box, Stack, useMediaQuery, useTheme, keyframes } from "@mui/material";
import Banner from "../images/banner.png";
import { BANNER_URL } from "../app/config";

function MainLayout() {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const footerStyles = {
    flexShrink: 0,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  };

  const blinkAnimation = keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  `;

  const adBannerStyles = {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    width: "15vw",
    height: "100vh",
    backgroundColor: "none",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: `${blinkAnimation} 1.5s infinite`,
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "primary.main",
      }}
    >
      {isFullScreen && (
        <>
          <Box sx={{ ...adBannerStyles, left: 0 }}>
            <a href={BANNER_URL} target="_blank" rel="noopener noreferrer">
              <img
                src={Banner}
                alt="Left Banner"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </a>
          </Box>
          <Box sx={{ ...adBannerStyles, right: 0 }}>
            <a href={BANNER_URL} target="_blank" rel="noopener noreferrer">
              <img
                src={Banner}
                alt="Right Banner"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </a>
          </Box>
        </>
      )}
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter sx={footerStyles} />
    </Stack>
  );
}

export default MainLayout;
