import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/logoApp.png'

import { getProfile } from '../shared/getProfile'
import Navbar from './Navbar'
import config from '../../configs/Configs.json'

const { AVATAR_DEFAULT_MALE } = config

const Header2 = () => {
  const [userInfo, setUserInfo] = useState(null)
  const username = localStorage.getItem('UserNameIuDi')

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile(username)
      setUserInfo(res)
    }

    fetchProfile()
  }, [])

  return (
    <div
      id="header2"
      className="left-0 right-0 z-10 flex items-center justify-between text-white border-b border-solid border-b-white"
    >
      <div className="flex items-center gap-2">
        <Link
          to={`/profile/${username}`}
          className="w-20 h-20 overflow-hidden m-[15px] rounded-[50%]"
        >
          <img
            src={AVATAR_DEFAULT_MALE || userInfo?.avatarLink}
            alt="avatar"
            className="w-full h-full"
          />
        </Link>

        <h3 className="capitalize">{username}</h3>
      </div>

      <Navbar />
    </div>
  )
}
export default Header2
