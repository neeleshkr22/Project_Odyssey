import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import "../src/Css/index.css"
import Register from './components/Register.jsx'
import ThemeSettings from './components/ThemeSettings.jsx'
import Login from './components/Login.jsx'
import { useThemeStore } from './components/useThemeStore'
import CarForm from './Forms/CarForm.jsx'
import DriverForm from './Forms/DriverForm.jsx'
import VehicleDetails from './Master/VehicleDetails.jsx'
import DriverDetails from './Master/DriverDetails.jsx'
import OwnerDetails from './Master/OwnerDetails.jsx'
import PartyForm from './Forms/PartyForm.jsx'
import PartyDetails from './Master/PartyDetails.jsx'
import TripDetails from './Master/TripDetails.jsx'
import TripForm from './Forms/TripForm.jsx'
import VehiclePage from './Master/VehiclePage.jsx'
import DriverPage from './Master/DriverPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  
  {
    path: '/register',
    element: <Register />
  },
  
  {
    path: '/settings',
    element: <ThemeSettings />
  },
  
  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/addcar',
    element: <CarForm />
  },
  {
    path: '/adddriver',
    element: <DriverForm />
  },
  {
    path: '/vehicle-master',
    element: <VehicleDetails />
  },
  {
    path: '/driver-master',
    element: <DriverDetails />
  },
  {
    path: '/owner-master',
    element: <OwnerDetails />
  },
  {
    path: '/addparty',
    element: <PartyForm />
  },
  
  {
    path: '/party-master',
    element: <PartyDetails />
  },
  {
    path: '/trip-master',
    element: <TripDetails />
  },
  {
    path: '/addtrip',
    element: <TripForm />
  },
  {
    path: '/vehicle/:id',
    element: <VehiclePage />
  },
  {
    path: '/driver/:id',
    element: <DriverPage />
  },


])

const Root = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]); 

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
