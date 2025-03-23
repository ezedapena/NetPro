import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import { Case } from "@/application/models/case";
import { ROUTES } from "@/routes/routes";
import { CaseRow } from "@/infrastructure/components/styled";

interface CasesGridProps {
  cases: Case[];
  isLoading: boolean;
  prevCasesQuantity: number;
}

export const CasesGrid: React.FC<CasesGridProps> = ({
  cases,
  isLoading,
  prevCasesQuantity,
}) => {
  const navigate = useNavigate();

  return (
    <TableContainer sx={{ flexGrow: 2, overflowY: "auto" }}>
      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" height="100%">
          <CircularProgress />
        </Stack>
      ) : (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                Client Name
              </TableCell>
              <TableCell sx={{ borderBottom: "none", width: "15%" }}>
                DOA
              </TableCell>
              <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                Medical Status
              </TableCell>
              <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                Client Status
              </TableCell>
              <TableCell sx={{ borderBottom: "none", width: "20%" }}>
                Law Firm
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell
                  colSpan={5}
                  sx={{ borderBottom: "none", padding: "7px" }}
                >
                  <CaseRow onClick={() => navigate(ROUTES.CASE_DETAIL(row.id))}>
                    <Box sx={{ width: "20%" }}>
                      {prevCasesQuantity + idx}. {row.client_name}
                    </Box>
                    <Box sx={{ width: "15%" }}>{row.doa}</Box>
                    <Box sx={{ width: "20%" }}>{row.medical_status}</Box>
                    <Box sx={{ width: "20%" }}>{row.client_status}</Box>
                    <Box sx={{ width: "20%" }}>{row.law_firm}</Box>
                  </CaseRow>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
