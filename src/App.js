import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Màu xanh chính
    },
    background: {
      default: "#e0f7fa", // Màu nền mặc định
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
