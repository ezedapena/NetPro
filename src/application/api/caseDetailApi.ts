import { mockCases } from '@/application/mocks/mockCases';
import { CaseDetails } from '@/application/models/case';

export const fetchCaseDetails = async (id: string): Promise<CaseDetails> => {
  await new Promise((res) => setTimeout(res, 500));

  const foundCase = mockCases.find((c) => c.id === id);

  if (!foundCase) {
    throw new Error('Case not found');
  }

  return {
    id: foundCase.id,
    clientName: foundCase.client_name,
    dateOfBirth: '10/11/1971',
    dateOfIncident: foundCase.doa,
    lawFirm: foundCase.law_firm,
    expenses: [
      { id: '1', label: 'Lyft 05/12/2024', amount: 54.12, deductedFrom: 'Client Settlement' },
      { id: '2', label: 'Lyft 05/02/2024', amount: 38.23, deductedFrom: 'Client Settlement' },
      { id: '3', label: 'Lyft 04/23/2024', amount: 20.39, deductedFrom: 'Client Settlement' },
      { id: '4', label: '04/02/2024', amount: 39.28, deductedFrom: 'Client Settlement' },
      { id: '5', label: '03/28/2024', amount: 24.52, deductedFrom: 'Client Settlement' },
    ],
  };
};
