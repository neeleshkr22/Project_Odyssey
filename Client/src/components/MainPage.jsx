import React, { useState } from 'react'
import Dashboard from './Dashboard'  
import Sidebar from './Sidebar'
import CarForm from '../Forms/CarForm'


const MainPage = () => {
    const [active , setActive] = useState('dashboard');
  return (
    
    <div className='mainpage flex '>

        <div className="main">
        {active === 'dashboard' && <div><Dashboard></Dashboard></div>}
        </div> 

        <div className="sidebar">
        <Sidebar></Sidebar>
        </div> 

    
     
    </div>
  )
}

export default MainPage
