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
import InvoiceByvehicle from './Reports/InvoiceByvehicle.jsx'
import InvoiceByParty from './Reports/invoiceByParty.jsx'
import InvoiceByDriver from './Reports/invoiceByDriver.jsx'

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
  {
    path: '/party/:id',
    element: <PartyPage />
  },
  {
    path: '/maintenance/:id',
    element: <MaintenanceForm />
  },
  {
    path: '/fuel/:id',
    element: <FuelForm />
  },
  {
    path : '/trip/:id',
    element : <TripPage />
  },
  {
    path : '/fuelReport',
    element : <FuelReport />
  },
  {
    path : '/maintenanceReport',
    element : <MaintenanceReport />
  },
  {
    path : '/dutySlip/:id',
    element : <DutySlip />
  },
  {
    path : '/bookingReport',
    element : <TripDetails />
  },
  {
    path : 'duty-slip-printing',
    element : <DutySlipPrint />
  },
  {
    path : 'PendingBillReport',
    element : <PendingBillReport />
  },
  {
    path : 'HireCar',
    element : <HireCarPage />
  },
  {
    path : 'HireCarForm',
    element : <HireCar />
  },
  {
    path : '/invoice',
    element : <InvoicePrinting />
  },
  {
    path : '/invoiceByVehicle',
    element : <InvoiceByvehicle />
  },
  {
    path : '/invoiceByDriver',
    element : <InvoiceByDriver/>
  },
  {
    path : '/invoiceByParty',
    element : <InvoiceByParty/>
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
