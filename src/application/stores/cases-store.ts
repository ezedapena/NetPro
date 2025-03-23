import { useShallow } from "zustand/react/shallow";
import { create } from "zustand";
import { fetchCases } from "@/application/api/casesApi";
import { Case, MedicalStatus } from "@/application/models/case";

interface CasesState {
  cases: Case[];
  filterStatus: MedicalStatus | "";
  currentPage: number;
  pageSize: number;
  totalCases: number;
  searchTerm: string;
  isLoading: boolean;

  actions: {
    setSearchTerm: (term: string) => void;
    setFilterStatus: (status: MedicalStatus | "") => void;
    setPage: (page: number) => void;
    fetchCases: () => Promise<void>;
  };
}

const useCasesStore = create<CasesState>((set, get) => ({
  cases: [],
  filterStatus: "",
  currentPage: 1,
  pageSize: 10,
  totalCases: 0,
  searchTerm: "",
  isLoading: false,

  actions: {
    setSearchTerm: (searchTerm: string) => set({ searchTerm, currentPage: 1 }),

    setFilterStatus: (filterStatus: MedicalStatus | "") =>
      set({ filterStatus, currentPage: 1 }),

    setPage: (page: number) => set({ currentPage: page }),

    fetchCases: async () => {
      set({ isLoading: true });
      const { currentPage, pageSize, searchTerm, filterStatus } = get();

      const response = await fetchCases(
        currentPage,
        pageSize,
        searchTerm,
        filterStatus
      );
      set({
        cases: response.cases,
        totalCases: response.totalCases,
        isLoading: false,
      });
    },
  },
}));

export const useCases = () =>
  useCasesStore(
    useShallow((state) => ({
      cases: state.cases,
      currentPage: state.currentPage,
      totalCases: state.totalCases,
      filterStatus: state.filterStatus,
      isLoading: state.isLoading,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
    }))
  );

export const useCasesActions = () => useCasesStore((state) => state.actions);
