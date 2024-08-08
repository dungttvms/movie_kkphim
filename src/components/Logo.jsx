import { Box } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoImg from "../images/Logo.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 50, height: 50, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <React.Fragment key="logo">{logo}</React.Fragment>;
  }
  return <RouterLink to="/"> {logo}</RouterLink>;
}

export default Logo;
