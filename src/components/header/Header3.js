import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from '../../images/logoApp.png'

import { getProfile } from '../shared/getProfile'
import Navbar from './Navbar'
import config from '../../configs/Configs.json'

const { AVATAR_DEFAULT_MALE } = config

const Header3 = ({ onGetHeight, isDark }) => {
 const [userInfo, setUserInfo] = useState(null)
 const username = localStorage.getItem('UserNameIuDi')

 useEffect(() => {
  const fetchProfile = async () => {
   const res = await getProfile(username)
   setUserInfo(res)
  }

  fetchProfile()
 }, [])

 const styles = {
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: isDark ? 'black' : 'transparent',
  transition: '.3s ease-in-out',
 }

 const headerRef = useRef()
 useLayoutEffect(() => {
  onGetHeight(headerRef.current.offsetHeight)
 }, [])

 return (
  <div
   ref={headerRef}
   id='header3'
   className='left-0 right-0 z-10 flex items-center justify-between text-white border-b border-solid border-b-white'
   style={styles}
  >
   <div className='flex items-center gap-2'>
    <Link
     to={`/profile/${username}`}
     className='w-20 h-20 overflow-hidden m-[15px] rounded-[50%]'
    >
     <img
      src={AVATAR_DEFAULT_MALE || userInfo?.avatarLink}
      alt='avatar'
      className='w-full h-full'
     />
    </Link>

    <h3 className='capitalize'>{username}</h3>
   </div>

   <div>
    <img src={Logo} alt='logo' />
   </div>

   <Navbar />
  </div>
 )
}
export default Header3
