import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const CaseRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "12px",
  padding: "12px 16px",
  backgroundColor: "rgba(115, 198, 209, 0.24)",
  marginBottom: "1px",
  cursor: "pointer",
  transition: "background 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(0, 200, 83, 0.27)",
  },
}));