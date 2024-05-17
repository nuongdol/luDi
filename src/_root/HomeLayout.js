import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/shared/SideBar'
import Header2 from '../components/header/Header2'
import background from '../images/bg3.jpg'



const HomeLayout = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'white',
  }

  return (
    <div style={backgroundImageStyle}>
      <Header2 />
      <div className="grid grid-cols-4">
        <div className="h-[80vh] p-5 col-span-1 overflow-y-auto overflow-x-hidden">
          <SideBar />
        </div>

        <div className="col-span-3 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
