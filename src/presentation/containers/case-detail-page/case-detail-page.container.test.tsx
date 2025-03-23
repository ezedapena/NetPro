import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import * as store from '@/application/stores/case-details-store';
import CaseDetailContainer from './case-detail-page.container';

const mockCase = {
  clientName: 'Greg Conner',
  dateOfBirth: '10/1/1971',
  dateOfIncident: '12/29/2023',
  lawFirm: 'Julian Sanders & Associates',
  expenses: [],
};

jest.mock('@/application/stores/case-details-store');

describe('CaseDetailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (store.useCaseDetails as jest.Mock).mockReturnValue({
      caseDetails: mockCase,
      isLoadingDetails: false,
    });

    (store.useCaseDetailsActions as jest.Mock).mockReturnValue({
      fetchCaseDetails: jest.fn(),
    });
  });

  test('renders both tabs', () => {
    render(
      <BrowserRouter>
        <CaseDetailContainer />
      </BrowserRouter>
    );

    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Expenses/i)).toBeInTheDocument();
  });

  test('renders details content by default', () => {
    render(
      <BrowserRouter>
        <CaseDetailContainer />
      </BrowserRouter>
    );

    expect(screen.getByText(/Client Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Greg Conner/i)).toBeInTheDocument();
  });

  test('shows expenses tab when clicked', () => {
    render(
      <BrowserRouter>
        <CaseDetailContainer />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Expenses/i));
    expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
  });

  test('shows nothing if loading', () => {
    (store.useCaseDetails as jest.Mock).mockReturnValue({
      caseDetails: null,
      isLoadingDetails: true,
    });

    const { container } = render(
      <BrowserRouter>
        <CaseDetailContainer />
      </BrowserRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
