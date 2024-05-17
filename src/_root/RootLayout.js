import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <Outlet />
    </div>
  )
}

export default RootLayout
