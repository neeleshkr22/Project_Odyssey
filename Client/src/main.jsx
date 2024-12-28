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
