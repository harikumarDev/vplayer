import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useThemeStore } from "./utils/store";
import { Home, Login, Signup, Upload } from "./components";
import { lightTheme, darkTheme } from "./utils/theme";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Router>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/upload"
            exact
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
