export const ROUTES = {
    HOME: '/',
    CASES: '/cases',
    CASE_DETAIL: (caseId: string | number = ':caseId') => `/cases/${caseId}`,
  };
  