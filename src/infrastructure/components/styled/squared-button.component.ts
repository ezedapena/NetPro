import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SquaredButton = styled(Button)(() => ({
  borderRadius: 0,
  textTransform: "none",
  fontWeight: 500,
  padding: "8px 25px",
  fontSize: "0.875rem",
  boxShadow: "none",
  minWidth: "10rem",
}));
