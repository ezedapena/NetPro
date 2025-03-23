import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Stack,
} from "@mui/material";
import { AddExpenseModal } from "../add-expense-modal/add-expense-modal.component";
import { useCaseDetailsActions } from "@/application/stores/case-details-store";
import { Expense } from "@/application/models/case";
import { SquaredButton } from "@/infrastructure/components/styled/squared-button.component";

interface ExpensesTabProps {
  expenses: Expense[];
}

export const ExpensesTab: React.FC<ExpensesTabProps> = ({ expenses }) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const { addExpense, deleteExpenses } = useCaseDetailsActions();

  const handleAddExpense = (data: {
    type: string;
    label: string;
    amount: number;
  }) => {
    addExpense({
      id: crypto.randomUUID(),
      deductedFrom: data.type,
      label: data.label,
      amount: Number(data.amount),
    });
  };

  const handleDelete = () => {
    if (selected.length === 0) return;
    deleteExpenses(selected);
    setSelected([]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="flex-end" spacing={1} mb={2}>
        <SquaredButton
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={selected.length === 0}
        >
          Delete
        </SquaredButton>
        <SquaredButton
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add Expense
        </SquaredButton>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"></TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Label</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Deducted From</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id} hover>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(expense.id)}
                  onChange={() => handleSelect(expense.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{expense.label}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{expense.deductedFrom}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddExpenseModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddExpense}
      />
    </Box>
  );
};
