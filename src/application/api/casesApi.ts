import { mockCases } from '@/application/mocks/mockCases';
import { Case, MedicalStatus } from '@/application/models/case';

interface FetchCasesResponse {
  cases: Case[];
  totalCases: number;
}

export const fetchCases = async (
  page: number,
  pageSize: number,
  searchTerm: string,
  filterStatus: MedicalStatus | '',
): Promise<FetchCasesResponse> => {
  await new Promise((res) => setTimeout(res, 500));

  // filter by searchTerm and medical status
  const filteredCases = mockCases
    .filter((c) =>
      c.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((c) => (filterStatus ? c.medical_status === filterStatus : true));

  // paginate the results
  const startIndex = (page - 1) * pageSize;
  const paginatedCases = filteredCases.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    cases: paginatedCases,
    totalCases: filteredCases.length,
  };
};
