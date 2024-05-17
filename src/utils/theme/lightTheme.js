import { createTheme } from "@mui/material/styles";
import Palette from "./overrides/Palette";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...Palette,
  },
});

export default lightTheme;
