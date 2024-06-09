import React from 'react'
import { Outlet } from 'react-router-dom'

import appstore from '../images/appstore.png'
import chplay from '../images/chplay.png'
import Logo from '../images/logoApp.png'

import Header1 from '../components/header/Header1'
import Footer from '../components/shared/Footer'
import background from '../images/background.jpg'
// import './forms/styleSignin.css'

const AuthLayout = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    // minHeight: 'screen',
  }

  return (
    <div
      className="authPage flex flex-col justify-between w-full h-screen"
      style={backgroundImageStyle}
    >
      <Header1 />
      <div className="flex flex-col justify-center items-center mt-[100px] relative top-[-150px] ">
        <img src={Logo} alt="Your" className="w-[400px]" />
        <h1 className="font-bold text-white text-7xl text-center" >Kết Nối Yêu Thương</h1>
        <div className="flex justify-center items-center mt-[30px]">
          <a href="#" className="">
            <img src={appstore} alt="appstore" className="w-[200px] h-[100px]" />
          </a>
          <a href="#" className="">
            <img src={chplay} alt="chplay" className="w-[230px] h-[100px]" />
          </a>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default AuthLayout
