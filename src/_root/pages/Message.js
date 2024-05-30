import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import config from '../../configs/Configs.json'

import { useDispatch, useSelector } from 'react-redux'
import {
 fetchMessages,
 messagesSelector,
 postMessage,
} from '../../redux/messages/messagesSlice'

import callPhone from '../../images/icons/callphone.png'
import callVideo from '../../images/icons/callvideo.png'
import send from '../../images/icons/send.png'

import Moment from 'react-moment'

const { AVATAR_DEFAULT_FEMALE } = config

const Message = () => {
 const { id } = useParams()

 const location = useLocation()
 const { userName, isOnline, userId } = location.state
 const messRef = useRef()
 const [messageForm, setMessageForm] = useState('')

 const { messages, postToggle } = useSelector(messagesSelector)
 const dispatch = useDispatch()

 useEffect(() => {
  messRef.current.scrollTop = messRef.current.scrollHeight
 }, [messages])

 useEffect(() => {
  dispatch(fetchMessages(id))
 }, [id, postToggle])

 const handleSubmitForm = (e) => {
  e.preventDefault()
  if (messageForm.trim() !== '') {
   const data = {
    content: messageForm,
    idReceive: parseInt(id),
    idSend: userId,
    MessageTime: new Date(),
   }

   dispatch(postMessage(data))
   setMessageForm('')
  }
 }

 return (
  <div className='pb-5 bg-white rounded-3xl'>
   <div className='flex  p-5 items-center justify-between border-b-[#817C7C] border-b border-solid'>
    <div className='flex gap-2'>
     <img
      className='w-[66px] h-[66px] rounded-full'
      src={AVATAR_DEFAULT_FEMALE}
      alt='avatar female'
     />

     <div className='flex flex-col justify-center text-black'>
      <h5>{userName}</h5>

      <p className={isOnline ? `text-[#008748]` : 'text-gray'}>
       {isOnline ? 'Đang hoạt động' : 'Đang Offline'}
      </p>
     </div>
    </div>

    <div className='flex gap-5'>
     <div>
      <img src={callVideo} alt='call video' />
     </div>

     <div>
      <img src={callPhone} alt='call phone' />
     </div>
    </div>
   </div>

   <div className='h-[60vh] p-[20px] overflow-y-auto' ref={messRef}>
    {messages.map(
     ({ SenderID, OtherAvatar, MessageID, Content, MessageTime }) =>
      SenderID !== parseInt(id) ? (
       <div className='flex justify-end pb-3' key={MessageID}>
        <div className='flex flex-col items-end'>
         <p className='bg-blue-600 rounded-[8px] p-[10px]'>{Content}</p>

         <Moment
          date={`${MessageTime}+0700`}
          format='hh:mm A'
          className='text-xs text-gray-500'
         />
        </div>
       </div>
      ) : (
       <div key={MessageID} className='pb-3'>
        <div className='flex items-center justify-start gap-3 '>
         <div>
          <img
           className='w-[40px] h-[40px] rounded-full'
           src={AVATAR_DEFAULT_FEMALE}
           alt='user other avatar'
          />
         </div>

         <div className=''>
          <p className='bg-black rounded-[8px] p-[10px]'>{Content}</p>
         </div>
        </div>
        <Moment
         date={`${MessageTime}+0700`}
         format='hh:mm A'
         className='text-xs text-gray-500'
        />
       </div>
      )
    )}
   </div>

   <div>
    <form
     onSubmit={handleSubmitForm}
     className='flex items-center overflow-hidden justify-center p-5 m-3 border text-black h-[70px] rounded-[50px] border-solid border-[#4EC957]'
    >
     <input
      className='w-full mr-5 focus-visible:outline-none '
      type='text'
      placeholder='Hãy gửi lời chào...'
      onChange={(e) => setMessageForm(e.target.value)}
      value={messageForm}
     />

     <div className='flex gap-3'>
      <button type='submit'>
       <img className='ml-5 h-[33px] w-[33px]' src={send} alt='send' />
      </button>
     </div>
    </form>
   </div>
  </div>
 )
}

export default Message
