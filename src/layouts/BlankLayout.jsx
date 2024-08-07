import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <Stack
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "primary.lighter" }}
    >
      <Logo sx={{ width: 300, height: 200, mb: 8 }} />
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
