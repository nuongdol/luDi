import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import {
 fetchHistoryMessages,
 messagesSelector,
} from '../../redux/messages/messagesSlice'

import io from 'socket.io-client'
import config from '../../configs/Configs.json'

const { AVATAR_DEFAULT_MALE, AVATAR_DEFAULT_FEMALE } = config

const socket = io('https://api.iudi.xyz')

const SideBar = () => {
 var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
 }

 const [userIdOtherList, setUserIdOtherList] = useState([])
 const [userOtherList, setUserOtherList] = useState([])

 const { historyMessages, postToggle } = useSelector(messagesSelector)
 const dispatch = useDispatch()

 const userId = localStorage.getItem('UserId')
 const userName = localStorage.getItem('UserNameIuDi')
 const { id } = useParams()

 useEffect(() => {
  // client connect to server
  socket.emit('userId', { userId: userId })

  socket.on('online', (data) => {
   setUserIdOtherList(data.user)
  })
 }, [socket, userId])

 useEffect(() => {
  dispatch(fetchHistoryMessages())
 }, [postToggle])

 const getProfileChat = async (id) => {
  if (id && id !== userId) {
   const { data } = await axios.get(`https://api.iudi.xyz/api/chat/${id}`)
   const user = {
    id: data.data[0].UserID,
    username: data.data[0].Username,
    avatar: data.data[0].Avatar,
   }

   if (data.data.length > 0) {
    setUserOtherList([...userOtherList, user])
   }
  }
 }

 useEffect(() => {
  userIdOtherList.forEach((id) => {
   if (id !== userId) getProfileChat(id)
  })
 }, [userIdOtherList])

 return (
  <>
   <Slider {...settings}>
    <div className='text-center'>
     <Link to={`/profile/${userName}`}>
      <img
       className='mx-auto w-[73px] h-[73px] rounded-full'
       src={AVATAR_DEFAULT_MALE}
       alt='avatar'
      />
      <h5 className='capitalize'>{userName}</h5>
     </Link>
    </div>

    {userOtherList.length > 0
     ? userOtherList.map(({ id, username, avatar }) => (
        <div className='text-center' key={id}>
         <Link to={`/profile/${username}`}>
          <img
           className=' mx-auto w-[73px] h-[73px] rounded-full'
           src={AVATAR_DEFAULT_MALE}
           alt='avatar'
          />
          <h5 className='capitalize'> {username}</h5>
         </Link>
        </div>
       ))
     : ''}
   </Slider>

   <div className=' pr-[30px]'>
    <ul>
     {historyMessages.map(
      ({
       MessageID,
       Content,
       OtherFullname,
       OtherUsername,
       OtherAvatar,
       MessageTime,
       OtherUserID,
      }) => {
       let isOnline = false
       userIdOtherList.some((userId) => (isOnline = userId === OtherUserID))

       return (
        <li
         key={MessageID}
         style={
          parseInt(id) === OtherUserID ? { background: 'rgba(0,0,0,.2)' } : {}
         }
        >
         <Link
          to={`/home/message/${OtherUserID}`}
          state={{
           userName: OtherFullname,
           isOnline,
           userId,
          }}
         >
          <div className='flex items-center justify-between mt-4 cursor-pointer'>
           <div className='flex items-center gap-2'>
            <img
             className=' mx-auto w-[73px] h-[73px] rounded-full'
             src={AVATAR_DEFAULT_FEMALE}
             alt={`avatar ${OtherUsername}`}
            />

            <div>
             <h3 className='capitalize'>{OtherFullname}</h3>
             <p className='text-gray-500'>{Content}</p>
            </div>
           </div>

           <div className='flex flex-col items-end'>
            <Moment date={`${MessageTime}+0700`} format='hh:mm A' />
            {isOnline && (
             <span
              className={`w-[16px] h-[16px] rounded-full bg-[#FFA451]`}
             ></span>
            )}
           </div>
          </div>
         </Link>
        </li>
       )
      }
     )}
    </ul>
   </div>
  </>
 )
}

export default SideBar
