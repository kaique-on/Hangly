import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./routes/LandingPage.jsx"
import LoginPage from "./routes/LoginPage.jsx"
import CadastroPage from "./routes/CadastroPage.jsx"
import ErrorPage from "./routes/ErrorPage.jsx";
import HomePage from "./routes/HomePage.jsx";
import EventPage from "./routes/EventPage.jsx";
import ProfilePage from "./routes/ProfilePage.jsx";
import CreateEventPage from './routes/CreateEventPage.jsx';

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
      element: <LoginPage />,
  },
  {
    path: "/signin",
    element: <CadastroPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/event",
    element: <EventPage />,
  },
  {
    path: "/create",
    element: <CreateEventPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
