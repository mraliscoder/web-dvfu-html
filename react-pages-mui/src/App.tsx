import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './main/Main';
import List from './list/List';
import Building from './building/Building';
import Chart from './chart/Chart';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/list', element: <List /> },
  { path: '/building/:id', element: <Building /> },
  { path: '/chart', element: <Chart /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
