import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./App.css";
import ThemeProvider from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
