import { createTheme } from "@mui/material/styles";
import Palette from "./overrides/Palette";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...Palette,
  },
});

export default darkTheme;
