import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    paddingLeft: "10px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#d9e1ec",
    },
    "&:hover fieldset": {
      borderColor: "#bfcce0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#90a4d1",
    },
  },
}));
