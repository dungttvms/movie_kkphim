import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import {
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  keyframes,
  styled,
} from "@mui/material";
import Banner_Left from "../images/bannerLeft.png";
import Banner_Right from "../images/bannerRight.png";
import { BANNER_URL } from "../app/config";

const FixedHeader = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
}));

function MainLayout() {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const headerHeight = 64; // Adjust this value based on the actual height of your header

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
      opacity: 0.68;
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
      <FixedHeader>
        <MainHeader />
      </FixedHeader>
      <Box sx={{ pt: `${headerHeight}px`, flexGrow: 1 }}>
        {isFullScreen && (
          <>
            <Box sx={{ ...adBannerStyles, left: 0 }}>
              <a href={BANNER_URL} target="_blank" rel="noopener noreferrer">
                <img
                  src={Banner_Left}
                  alt="Left Banner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </a>
            </Box>
            <Box sx={{ ...adBannerStyles, right: 0 }}>
              <a href={BANNER_URL} target="_blank" rel="noopener noreferrer">
                <img
                  src={Banner_Right}
                  alt="Right Banner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </a>
            </Box>
          </>
        )}
        <Outlet />
      </Box>
      <MainFooter sx={footerStyles} />
    </Stack>
  );
}

export default MainLayout;
