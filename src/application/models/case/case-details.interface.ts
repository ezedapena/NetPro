import { Expense } from "./expense.interface";

export interface CaseDetails {
  id: string;
  clientName: string;
  dateOfBirth: string;
  dateOfIncident: string;
  lawFirm: string;
  expenses: Expense[];
}
