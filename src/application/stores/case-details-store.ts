import { create } from "zustand";
import { fetchCaseDetails } from "@/application/api/caseDetailApi";
import { CaseDetails, Expense } from "@/application/models/case";
import { useShallow } from "zustand/react/shallow";

interface CaseDetailsState {
  caseDetails: CaseDetails | null;
  isLoadingDetails: boolean;

  actions: {
    fetchCaseDetails: (id: string) => Promise<void>;
    clearCaseDetails: () => void;
    addExpense: (expense: Expense) => void;
    deleteExpenses: (ids: string[]) => void;
  };
}

const useCaseDetailsStore = create<CaseDetailsState>((set) => ({
  caseDetails: null,
  isLoadingDetails: false,

  actions: {
    fetchCaseDetails: async (id: string) => {
      set({ isLoadingDetails: true });
      const details = await fetchCaseDetails(id);
      set({ caseDetails: details, isLoadingDetails: false });
    },
    clearCaseDetails: () => set({ caseDetails: null }),
    addExpense: (expense: Expense) =>
      set((state) => ({
        caseDetails: {
          ...state.caseDetails!,
          expenses: [...state.caseDetails!.expenses, expense],
        },
      })),
    deleteExpenses: (ids: string[]) =>
      set((state) => ({
        caseDetails: state.caseDetails
          ? {
              ...state.caseDetails,
              expenses: state.caseDetails.expenses.filter(
                (exp) => !ids.includes(exp.id)
              ),
            }
          : null,
      })),
  },
}));

export const useCaseDetails = () =>
  useCaseDetailsStore(
    useShallow((state) => ({
      caseDetails: state.caseDetails,
      isLoadingDetails: state.isLoadingDetails,
    }))
  );

export const useCaseDetailsActions = () =>
  useCaseDetailsStore((state) => state.actions);
