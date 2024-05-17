import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Moment from 'react-moment'

import io from 'socket.io-client'
import config from '../../configs/Configs.json'

const { AVATAR_DEFAULT_MALE, AVATAR_DEFAULT_FEMALE } = config

const socket = io('https://api.iudi.xyz')

const SideBar = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
  }

  const [userIdOtherList, setUserIdOtherList] = useState([])
  const [userOtherList, setUserOtherList] = useState([])
  const [historyChatUser, setHistoryChatUser] = useState([])

  const userId = 259

  useEffect(() => {
    // client connect to server
    socket.emit('userId', { userId: userId })

    socket.on('online', (data) => {
      setUserIdOtherList(data.user)
    })
  }, [socket])

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

    return
  }

  const getHistoryChatUser = async (userId) => {
    try {
      const { data } = await axios.get(
        `https://api.iudi.xyz/api/chat/${userId}`
      )
      setHistoryChatUser(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHistoryChatUser(195)
  }, [userId])


  useEffect(() => {
    userIdOtherList.map((id) => id === getProfileChat(id))
  }, [userIdOtherList])


  return (
    <>
      <Slider {...settings}>
        <div className="text-center">
          <a href="#">
            <img
              className="mx-auto w-[73px] h-[73px] rounded-full"
              src={AVATAR_DEFAULT_MALE}
              alt="avatar"
            />
            <h5 className="capitalize"> Your Story</h5>
          </a>
        </div>

        {userOtherList.length > 0
          ? userOtherList.map(({ id, username, avatar }) => (
              <div className="text-center" key={id}>
                <a href="#">
                  <img
                    className=" mx-auto w-[73px] h-[73px] rounded-full"
                    src={AVATAR_DEFAULT_MALE}
                    alt="avatar"
                  />
                  <h5 className="capitalize"> {username}</h5>
                </a>
              </div>
            ))
          : ''}
      </Slider>

      <div className=" pr-[30px]">
        <ul>
          {historyChatUser.length > 0
            ? historyChatUser.map(
                ({
                  MessageID,
                  Content,
                  OtherFullname,
                  OtherUsername,
                  OtherAvatar,
                  MessageTime,
                  OtherUserID,
                }) => (
                  <li key={MessageID}>
                    <Link to={`/home/message/${OtherUserID}`}>
                      <div className="flex items-center justify-between mt-4 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <img
                            className=" mx-auto w-[73px] h-[73px] rounded-full"
                            src={AVATAR_DEFAULT_FEMALE}
                            alt={`avatar ${OtherUsername}`}
                          />

                          <div>
                            <h3>{OtherFullname}</h3>
                            <p>{Content}</p>
                          </div>
                        </div>

                        <div>
                          <Moment format="hh:mm A">{MessageTime}</Moment>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              )
            : ''}
        </ul>
      </div>
    </>
  )
}

export default SideBar
