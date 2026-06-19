import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './main/Main';
import List from './list/List';
import Building from './building/Building';
import Chart from './chart/Chart';
import Testing from './testing/Testing';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/list', element: <List /> },
  { path: '/building/:id', element: <Building /> },
  { path: '/chart', element: <Chart /> },
  { path: '/testing', element: <Testing /> },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
