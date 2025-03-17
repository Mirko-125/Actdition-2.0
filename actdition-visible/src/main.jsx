import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Manual from './pages/Manual.jsx';

const router = createBrowserRouter(
  [
    { path: '/', element: <App /> },
    { path: '/manual', element: <Manual /> },
  ]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
