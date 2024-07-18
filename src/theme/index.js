import React from "react";
import {
  ThemeProvider as MUIThemeProvider,
  alpha,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const PRIMARY = {
  lighter: "#A9A9A9", // light gray
  light: "#696969", // dim gray
  main: "#000000", // black
  dark: "#2F4F4F", // dark slate gray
  darker: "#1C1C1C", // very dark gray
  contrastText: "#fff", // white for contrast
};
const SECONDARY = {
  lighter: "#FFFFFF", // White
  light: "#F5F5F5", // Very light gray
  main: "#EEEEEE", // Light gray
  dark: "#E0E0E0", // Medium gray
  darker: "#BDBDBD", // Dark gray
  contrastText: "#333", // Dark gray for contrast text
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
      background: {
        paper: "#fff",
        default: "#fff",
        neutral: GREY[200],
        mainStyle: "#000000",
      },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 8 },

    // components: {
    // },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
