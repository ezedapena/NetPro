import { ReactNode } from "react";
import { Paper } from "@mui/material";

interface MainCardProps {
  children: ReactNode;
}

export const MainCard = ({ children }: MainCardProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: "calc(100vh - 104px)",
        display: "flex",
        flexDirection: "column",
        p: 3,
        borderRadius: 2,
      }}
    >
      {children}
    </Paper>
  );
};
