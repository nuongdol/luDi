import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../../configs/Configs.json'

import attach from '../../images/icons/attach.png'
import callPhone from '../../images/icons/callphone.png'
import callVideo from '../../images/icons/callvideo.png'
import emoji from '../../images/icons/emoji.png'
import record from '../../images/icons/record.png'
import send from '../../images/icons/send.png'

import io from 'socket.io-client'
import Moment from 'react-moment'

const socket = io('https://api.iudi.xyz')
const { AVATAR_DEFAULT_FEMALE } = config

const Message = () => {
  const [historyChatUserVsOther, setHistoryChatUserVsOther] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getHistoryChatUserVsOther(id)
  }, [id])

  const getHistoryChatUserVsOther = async (otherUserId) => {
    try {
      const { data } = await axios.get(
        `https://api.iudi.xyz/api/pairmessage/195?other_userId=${otherUserId}`
      )

      setHistoryChatUserVsOther(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log('message:', historyChatUserVsOther)

  return (
    <div className="pb-5 bg-white rounded-3xl">
      <div className="flex  p-5 items-center justify-between border-b-[#817C7C] border-b border-solid">
        <div className="flex gap-2">
          <img
            className="w-[66px] h-[66px] rounded-full"
            src={AVATAR_DEFAULT_FEMALE}
            alt="avatar female"
          />

          <div className="flex flex-col justify-center text-black">
            <h5>Mai Phương Thúy</h5>
            <p className="status text-[#008748]">Đang hoạt động</p>
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <img src={callVideo} alt="call video" />
          </div>

          <div>
            <img src={callPhone} alt="call phone" />
          </div>
        </div>
      </div>

      <div className="h-[50vh] p-[20px] overflow-y-auto">
        {historyChatUserVsOther.map(
          ({ SenderID, OtherAvatar, MessageID, Content, MessageTime }) =>
            SenderID !== parseInt(id) ? (
              <div className="flex justify-end pb-3">
                <div>
                  <p className="bg-blue-600 rounded-[8px] p-[10px]">
                    {Content}
                  </p>

                  <Moment
                    format="hh:mm A"
                    className="text-xs text-gray-500"
                  >
                    {MessageTime}
                  </Moment>
                </div>
              </div>
            ) : (
              <div key={MessageID} className="pb-3">
                <div className="flex items-center justify-start gap-3 ">
                  <div>
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={AVATAR_DEFAULT_FEMALE}
                      alt="user other avatar"
                    />
                  </div>

                  <div className="">
                    <p className="bg-black rounded-[8px] p-[10px]">
                      {Content}
                    </p>
                  </div>
                </div>
                <Moment
                  format="hh:mm A"
                  className="text-xs text-gray-500"
                >
                  {MessageTime}
                </Moment>
              </div>
            )
        )}
      </div>

      <div className="flex items-center overflow-hidden justify-center p-5 m-3 border text-black h-[70px] rounded-[50px] border-solid border-[#4EC957]">
        <input
          className="w-full mr-5 focus-visible:outline-none "
          type="text"
          placeholder="Hãy gửi lời chào..."
        />

        <div className="flex gap-3">
          <div>
            <img className="h-[33px] w-[33px]" src={emoji} alt="emoji" />
          </div>
          <div>
            <img className="h-[33px] w-[33px]" src={attach} alt="attach" />
          </div>
          <div>
            <img className="h-[33px] w-[33px]" src={record} alt="record" />
          </div>
          <div>
            <img className="ml-5 h-[33px] w-[33px]" src={send} alt="send" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
