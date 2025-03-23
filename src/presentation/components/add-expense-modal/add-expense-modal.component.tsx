import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { type: string; label: string; amount: number }) => void;
}

const deductionOptions = ["Not Deducted", "Client Settlement"];

export const AddExpenseModal = ({
  open,
  onClose,
  onSubmit,
}: AddExpenseModalProps) => {
  const [type, setType] = useState("Not Deducted");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    onSubmit({ type, label, amount });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Add Expense</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Deduction Type"
          select
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          margin="normal"
        >
          {deductionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Expense Label"
          fullWidth
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          margin="normal"
        />

        <TextField
          type="number"
          label="Expense Amount"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>$</Typography>
                </InputAdornment>
              ),
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7A5EA8",
            textTransform: "none",
            px: 4,
            "&:hover": { backgroundColor: "#6947a0" },
          }}
          onClick={handleSubmit}
        >
          Submit Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};
