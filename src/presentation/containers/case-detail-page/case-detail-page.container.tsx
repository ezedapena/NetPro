import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import { ExpensesTab } from "@/presentation/components/expenses-tab/expensas-tab.component";
import { DetailsTab } from "@/presentation/components/details-tab/details-tab.component";
import {
  useCaseDetails,
  useCaseDetailsActions,
} from "@/application/stores/case-details-store";

export default function CaseDetailContainer() {
  const { caseId } = useParams();
  const [tab, setTab] = useState<"details" | "expenses">("details");
  const { caseDetails, isLoadingDetails } = useCaseDetails();
  const { fetchCaseDetails } = useCaseDetailsActions();

  useEffect(() => {
    fetchCaseDetails(caseId!);
  }, [caseId, fetchCaseDetails]);

  if (isLoadingDetails || !caseDetails) {
    return null;
  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 104px)",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, val) => setTab(val)}
        slotProps={{ indicator: { style: { display: "none" } } }}
        sx={{
          px: 3,
          pt: 2,
          backgroundColor: "transparent",
          "& .MuiTab-root": {
            textTransform: "none",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            minWidth: 100,
            fontWeight: 700,
            outline: "none",
            "&:focus": {
              outline: "none",
            },
          },
          "& .Mui-selected": {
            backgroundColor: "white",
          },
        }}
      >
        <Tab label="Details" value="details" />
        <Tab label="Expenses" value="expenses" />
      </Tabs>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "white",
          px: 3,
          py: 2,
        }}
      >
        {tab === "details" && (
          <DetailsTab
            clientName={caseDetails.clientName}
            dateOfBirth={caseDetails.dateOfBirth}
            dateOfIncident={caseDetails.dateOfIncident}
            lawFirm={caseDetails.lawFirm}
          />
        )}
        {tab === "expenses" && <ExpensesTab expenses={caseDetails.expenses} />}
      </Box>
    </Box>
  );
}
