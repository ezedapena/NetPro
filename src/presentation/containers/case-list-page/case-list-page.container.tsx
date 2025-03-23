import { useEffect, useState } from "react";
import { useDebounce } from "@/application/hooks/useDebounce";
import {
  Typography,
  Stack,
  Pagination,
  Box,
} from "@mui/material";
import { MainCard } from "@/infrastructure/components/main-card/main-card.component";
import { CasesGrid } from "@/presentation/components/cases-grid/cases-grid.component";
import { SearchInput } from "@/infrastructure/components/search-input/search-input.component";
import { MedicalStatusSelect } from "@/presentation/components/medical-status-select/medical-status-select.component";
import { useCases, useCasesActions } from "@/application/stores/cases-store";

export default function ListPageContainer() {
  const { cases, currentPage, totalCases, filterStatus, isLoading, pageSize, searchTerm } = useCases();
  const { fetchCases, setPage, setFilterStatus, setSearchTerm } = useCasesActions();

  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    if (debouncedInput !== searchTerm) {
      setSearchTerm(debouncedInput);
    }
  }, [debouncedInput, setSearchTerm]);

  useEffect(() => {
    fetchCases();
  }, [currentPage, filterStatus, searchTerm]);

  const totalPages = Math.ceil(totalCases / pageSize);

  const prevCasesQuantity = (currentPage - 1) * pageSize + 1;

  return (
    <MainCard>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Clients</Typography>

        <Stack direction="row" spacing={2}>
          <SearchInput
            value={input}
            onChange={setInput}
            placeholder="Search Clients"
          />
          
          <MedicalStatusSelect 
            value={filterStatus} 
            onChange={setFilterStatus} 
          />
        </Stack>
      </Stack>

      <CasesGrid cases={cases} isLoading={isLoading} prevCasesQuantity={prevCasesQuantity} />

      <Box sx={{ pt: 2 }}>
        <Stack direction="row" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Box>
    </MainCard>
  );
}
