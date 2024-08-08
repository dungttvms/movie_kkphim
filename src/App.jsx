import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./App.css";
import ThemeProvider from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
