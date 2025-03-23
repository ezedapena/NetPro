import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { mockCases } from '@/application/mocks/mockCases';
import * as store from '@/application/stores/cases-store';
import ListPageContainer from './case-list-page.container';

jest.mock('@/application/stores/cases-store');


describe('ListPageContainer', () => {
  const fetchCases = jest.fn();
  const setSearchTerm = jest.fn();
  const setFilterStatus = jest.fn();
  const setPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (store.useCases as jest.Mock).mockReturnValue({
      cases: mockCases,
      currentPage: 1,
      totalCases: 30,
      filterStatus: '',
      isLoading: false,
      pageSize: 10,
      searchTerm: '',
    });

    (store.useCasesActions as jest.Mock).mockReturnValue({
      fetchCases,
      setSearchTerm,
      setFilterStatus,
      setPage,
    });
  });

  test('renders heading and search input', () => {
    render(
      <BrowserRouter>
        <ListPageContainer />
      </BrowserRouter>
    );

    expect(screen.getByText(/Clients/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search Clients/i)).toBeInTheDocument();
  });

  test('calls fetchCases on mount', () => {
    render(
      <BrowserRouter>
        <ListPageContainer />
      </BrowserRouter>
    );

    expect(fetchCases).toHaveBeenCalledTimes(1);
  });

  test('updates search input and debounces call', async () => {
    render(
      <BrowserRouter>
        <ListPageContainer />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Search Clients/i);
    fireEvent.change(input, { target: { value: 'Jane' } });

    await waitFor(() => {
      expect(setSearchTerm).toHaveBeenCalledWith('Jane');
    });
  });

  test('calls setPage on pagination click', () => {
    render(
      <BrowserRouter>
        <ListPageContainer />
      </BrowserRouter>
    );

    const pageButton = screen.getByRole('button', { name: /next page/i });

    fireEvent.click(pageButton);

    expect(setPage).toHaveBeenCalledWith(2);
  });
});
