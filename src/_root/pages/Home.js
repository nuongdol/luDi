import React from 'react'
import Logo from '../../images/logoApp.png'

import heart from '../../images/icons/heart.png'
import zesus from '../../images/icons/zesus.png'
import loader from '../../images/icons/loader.png'
import close from '../../images/icons/close.png'
import star from '../../images/icons/star.png'
import avatar from '../../images/icons/avatar-demo.png'

import compass2 from '../../images/compass2.png'
import home2 from '../../images/Home2.png'
import clock2 from '../../images/clock2.png'
import mes2 from '../../images/mes2.png'
import setting2 from '../../images/setting2.png'
import heart2 from '../../images/icons/heart2.png'
import star2 from '../../images/icons/Star2.png'
import close2 from '../../images/icons/close2.png'
const Home = () => {
  return (
    <>
      <div className="hidden">
        <div>
          <a href="/" className="block">
            <img className="mx-auto" src={Logo} alt="logo" />
          </a>
        </div>

        <div className="relative grid grid-cols-2 rounded-[58px] mx-[40px] mt-[30px]">
          <div className="h-[60vh] rounded-tl-[58px] rounded-bl-[58px] overflow-hidden">
            <img
              className="object-cover object-center w-full h-full"
              src={avatar}
              alt="avatar user"
            />
          </div>
          <div className="rounded-tr-[58px] rounded-br-[58px] bg-[#368A69] flex items-center justify-center flex-col">
            <h2 className="name">Mai Phương Thúy</h2>
            <p className="">Yêu màu hông ghét sự giả dối</p>
          </div>

          <div className="absolute bottom-0 translate-y-[60px] -translate-x-2/4 left-2/4 flex gap-3">
            <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
              <img src={close} alt="close" />
            </button>
            <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
              <img src={loader} alt="loader" />
            </button>
            <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
              <img src={star} alt="star" />
            </button>
            <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
              <img src={zesus} alt="zesus" />
            </button>
            <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
              <img src={heart} alt="heart" />
            </button>
          </div>
        </div>
      </div>

      <div className='flex justify-center align-item bg-[rgba(255,255,255,0)] w-1/4 h-full ml-96'>
        <div className="relative w-full h-full bg-white overflow-hidden">
          <div className='absolute h-1/2 w-[100%] -mt-10 '
            style={{ background: "linear-gradient(rgba(34, 106, 60, 1), rgba(33, 55, 37, 1))", borderRadius: "0px 0px 39px 39px", }}>
            <div className='flex justify-between items-center mx-6 mt-10 mt-14'>
              <img src={Logo} alt='logo' className='w-[50%]' />
              {/* <MdAccountCircle size={50} color="white" /> */}
            </div>
          </div>

          <div className='-mt-10'>
            <div className='absolute border-solid border-[5px] w-[80%] h-[50%] z-20 bg-[rgba(255,255,255,1)] mt-40 rounded-lg mx-8'>
              <div className='grid grid-cols-3 ml-9 mt-72'>
                <img src={close2} alt='close' className='w-[100%]' />
                <img src={star2} alt='star' className='w-[100%]' />
                <img src={heart2} alt='heart' className='w-[100%]' />
              </div>
            </div>
            <div className='absolute border-solid border-[5px] w-[75%] h-[50%] z-10 bg-[rgba(255,255,255,1)] mt-44 rounded-lg mx-10'></div>
            <div className='absolute border-slate-500 border-[5px] w-[70%] h-[50%] z-0 bg-[rgba(255,255,255,1)] mt-48 rounded-lg mx-12'></div>
          </div>
          <div className='grid grid-cols-5 gap-4 bg-white w-[100%] h-1/5 mt-[200%] mx-2 border-gray rounded-md'>
            <img src={home2} alt='home'/>
            <img src={clock2} alt='clock'/>
           
          </div>

        </div>
      </div>
    </>

  )
}

export default Home
