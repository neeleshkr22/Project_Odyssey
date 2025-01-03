import React from 'react'
import { NavLink } from 'react-router-dom'

const InvoicePrinting = () => {
  return (
    <div>
      <NavLink to={`/invoiceByVehicle`}>
      <button className=' btn btn-primary '>Invoice by Vehicle</button>
      </NavLink>
      <NavLink to={`/invoiceByDriver`}>
      <button className=' btn btn-primary '>Invoice by Driver</button>
      </NavLink>
      <NavLink to={`/invoiceByParty`}>
      <button className=' btn btn-primary '>Invoice by Party</button>
      </NavLink>

    </div>
  )
}

export default InvoicePrinting
