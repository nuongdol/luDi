import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import config from '../../configs/Configs.json'
import { getProfile } from '../shared/getProfile'
import Navbar from './Navbar'

const { AVATAR_DEFAULT_MALE } = config

const Header2 = ({ onGetHeight }) => {
 const [userInfo, setUserInfo] = useState(null)
 const username = localStorage.getItem('UserNameIuDi')

 const headerRef = useRef()

 useEffect(() => {
  const fetchProfile = async () => {
   const res = await getProfile(username)
   setUserInfo(res)
  }

  fetchProfile()
 }, [])

 useLayoutEffect(() => {
  onGetHeight(headerRef?.current.offsetHeight)
 }, [])

 return (
  <div
   ref={headerRef}
   id='header2'
   className='left-0 right-0 z-10 flex items-center justify-between text-white border-b border-solid border-b-white overflow-y-auto'
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

   <Navbar />
  </div>
 )
}
export default Header2
