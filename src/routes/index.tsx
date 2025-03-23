import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import Layout from '@/presentation/layouts/NetProLayout';
import ListPageContainer from '@/presentation/containers/case-list-page/case-list-page.container';
import CaseDetailContainer from '@/presentation/containers/case-detail-page/case-detail-page.container';


export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <ListPageContainer /> },
      {
        path: ROUTES.CASE_DETAIL(),
        element: <CaseDetailContainer />,
      },
    ],
  },
]);
