import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AddExpenseModal } from "./add-expense-modal.component";

describe("AddExpenseModal", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal with all fields", () => {
    render(<AddExpenseModal open={true} onClose={onClose} onSubmit={onSubmit} />);

    expect(screen.getByText("Add Expense")).toBeInTheDocument();
    expect(screen.getByLabelText("Deduction Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Expense Label")).toBeInTheDocument();
    expect(screen.getByLabelText("Expense Amount")).toBeInTheDocument();
  });

  test("fills out form and submits data", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
  
    render(<AddExpenseModal open={true} onClose={onClose} onSubmit={onSubmit} />);
  
    fireEvent.mouseDown(screen.getByLabelText("Deduction Type"));
    const option = await screen.findByText("Client Settlement");
    fireEvent.click(option);
  
    fireEvent.change(screen.getByLabelText("Expense Label"), {
      target: { value: "Test Expense" },
    });
  
    fireEvent.change(screen.getByLabelText("Expense Amount"), {
      target: { value: 100 },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /submit expense/i }));
  
    expect(onSubmit).toHaveBeenCalledWith({
      type: "Client Settlement",
      label: "Test Expense",
      amount: 100,
    });
  
    expect(onClose).toHaveBeenCalled();
  });
  
});
