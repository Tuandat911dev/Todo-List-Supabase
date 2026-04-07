import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomeLayout from 'pages/layout/HomeLayout'
import HomePage from 'pages/HomePage';
import 'styles/reset.css'
import TodoPage from './pages/TodoPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/todo",
        element: <TodoPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
