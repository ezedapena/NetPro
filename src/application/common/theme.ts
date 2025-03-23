import { createTheme } from "@mui/material/styles";

const lavenderMain = "#7A5EA8";
const lavenderLight = "#E6E0F8";
const lavenderDark = "#5A3B82";

export const theme = createTheme({
  palette: {
    primary: {
      main: lavenderMain,
      light: lavenderLight,
      dark: lavenderDark,
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: lavenderMain,
          borderColor: lavenderMain,
          "&.Mui-selected": {
            backgroundColor: lavenderLight,
            color: lavenderMain,
          },
          "&:hover": {
            backgroundColor: "#f3effc",
          },
        },
      },
    },
  },
});
