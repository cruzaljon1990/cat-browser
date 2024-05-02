import './App.css';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CatPage from './pages/CatPage';
import CatDetailPage from './pages/CatDetailPage';

function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      Component: CatPage
    },
    {
      path: '/:id',
      Component: CatDetailPage
    }
  ];

  const router = createBrowserRouter(routes);

  return (<RouterProvider router={router} />);
}

export default App;
