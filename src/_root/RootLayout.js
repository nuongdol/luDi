import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
 const [scrollTop, setScrollTop] = useState(0)

 
 return (
  <div className='flex flex-col justify-between w-full h-screen'>
   <Outlet />
  </div>
 )
}

export default RootLayout
