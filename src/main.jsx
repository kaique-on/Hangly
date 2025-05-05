import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./routes/LandingPage.jsx"
import Login from "./routes/LoginPage.jsx"
import ErrorPage from './routes/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    // pagina de erro
    errorElement: <ErrorPage />,

    children: [{
      path: "/",
      element: <LandingPage />,
      }]
  },

  {
      path: "/login",
      element: <Login />,
  },

  /* {
    path: "/login",
    element: <Cadastro />,
}, */
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
