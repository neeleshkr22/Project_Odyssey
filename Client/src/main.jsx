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
import PartyPage from './Master/PartyPage.jsx'
import MaintenanceForm from './Master/MaintenanceForm.jsx'
import FuelForm from './Master/FuelForm.jsx'
import TripPage from './Master/TripPage.jsx'
import FuelReport from './Reports/FuelReport.jsx'
import MaintenanceReport from './Reports/MaintenanceReport.jsx'
import DutySlip from './Reports/DutySlip.jsx'
import DutySlipPrint from './Reports/DetySlipPrint.jsx'
import PendingBillReport from './Reports/PendingBillReport.jsx'
import HireCar from './Reports/HireCar.jsx'
import HireCarPage from './Reports/HireCarPage.jsx'
import InvoicePrinting from './Reports/InvoicePrinting.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>
  },
  
  {
    path: '/register',
    element: <Register/>
  },
  
  {
    path: '/settings',
    element: <ProtectedRoute><ThemeSettings /></ProtectedRoute>
  },
  
  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/addcar',
    element: <ProtectedRoute><CarForm /></ProtectedRoute>
  },
  {
    path: '/adddriver',
    element: <ProtectedRoute><DriverForm /></ProtectedRoute>
  },
  {
    path: '/vehicle-master',
    element: <ProtectedRoute><VehicleDetails /></ProtectedRoute>
  },
  {
    path: '/driver-master',
    element: <ProtectedRoute><DriverDetails /></ProtectedRoute>
  },
  {
    path: '/owner-master',
    element: <ProtectedRoute><OwnerDetails /></ProtectedRoute>
  },
  {
    path: '/addparty',
    element: <ProtectedRoute><PartyForm /></ProtectedRoute>
  },
  
  {
    path: '/party-master',
    element: <ProtectedRoute><PartyDetails /></ProtectedRoute>
  },
  {
    path: '/trip-master',
    element: <ProtectedRoute><TripDetails /></ProtectedRoute>
  },
  {
    path: '/addtrip',
    element: <ProtectedRoute><TripForm /></ProtectedRoute>
  },
  {
    path: '/vehicle/:id',
    element: <ProtectedRoute><VehiclePage /></ProtectedRoute>
  },
  {
    path: '/driver/:id',
    element: <ProtectedRoute><DriverPage /></ProtectedRoute>
  },
  {
    path: '/party/:id',
    element: <ProtectedRoute><PartyPage /></ProtectedRoute>
  },
  {
    path: '/maintenance/:id',
    element: <ProtectedRoute><MaintenanceForm /></ProtectedRoute>
  },
  {
    path: '/fuel/:id',
    element: <ProtectedRoute><FuelForm /></ProtectedRoute>
  },
  {
    path : '/trip/:id',
    element : <ProtectedRoute><TripPage /></ProtectedRoute>
  },
  {
    path : '/fuelReport',
    element : <ProtectedRoute><FuelReport /></ProtectedRoute>
  },
  {
    path : '/maintenanceReport',
    element : <ProtectedRoute><MaintenanceReport /></ProtectedRoute>
  },
  {
    path : '/dutySlip/:id',
    element : <ProtectedRoute><DutySlip /></ProtectedRoute>
  },
  {
    path : '/bookingReport',
    element : <ProtectedRoute><TripDetails /></ProtectedRoute>
  },
  {
    path : 'duty-slip-printing',
    element : <ProtectedRoute><DutySlipPrint /></ProtectedRoute>
  },
  {
    path : 'PendingBillReport',
    element : <ProtectedRoute><PendingBillReport /></ProtectedRoute>
  },
  {
    path : 'HireCar',
    element : <ProtectedRoute><HireCarPage /></ProtectedRoute>
  },
  {
    path : 'HireCarForm',
    element : <ProtectedRoute><HireCar /></ProtectedRoute>
  },
  {
    path : '/invoice',
    element : <ProtectedRoute><InvoicePrinting /></ProtectedRoute>
  }

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
