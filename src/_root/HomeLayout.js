import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/shared/SideBar'
import Header2 from '../components/header/Header2'
import background from '../images/bg3.jpg'
import { set } from 'react-hook-form'

const HomeLayout = () => {
 const backgroundImageStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  color: 'white',
 }

 const [heightHeader, setHeightHeader] = useState('200')

 const sidebarStyles = {
  height: `calc(100vh - ${heightHeader}px)`,
 }

 const getHeightHeader = (height) => setHeightHeader(height)

 return (
  <div style={backgroundImageStyle}>
   <Header2 onGetHeight={getHeightHeader} />
   <div className='grid grid-cols-4'>
    <div
     style={sidebarStyles}
     className='p-5 col-span-1 overflow-y-scroll overflow-x-hidden'
     id='sidebar-message'
    >
     <SideBar />
    </div>

    <div className='col-span-3 p-5'>
     <Outlet />
    </div>
   </div>
  </div>
 )
}

export default HomeLayout
