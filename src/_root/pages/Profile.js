import {
 Card,
 CardBody,
 CardFooter,
 CardHeader,
 Typography,
} from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { FaAd, FaBirthdayCake, FaEnvelope, FaMale } from 'react-icons/fa'

import Header1 from '../../components/header/Header1'
import Footer from '../../components/shared/Footer'
import bg from '../../images/bg3.jpg'
import bgProfile from '../../images/profiles/bg-profile.png'

import FormChangePassword from '../../components/shared/FormChangePassword'
import configs from '../../configs/Configs.json'
import { Auth } from '../../components/shared/Auth'

const { userID } = new Auth()
const { AVATAR_DEFAULT_MALE, AVATAR_DEFAULT_FEMALE } = configs

function Profile() {
 const [profileData, setProfileData] = useState({})
 const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false)

 const { username } = useParams()
 const userName = localStorage.getItem('UserNameIuDi')

 const background = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
 }

 const navigate = useNavigate()
 useEffect(() => {
  const fetchProfileData = async () => {
   try {
    const response = await axios.get(
     `https://api.iudi.xyz/api/profile/${username}`
    )
    setProfileData(response.data.Users[0])
   } catch (error) {
    console.error('Error fetching profile data:', error)
   }
  }

  fetchProfileData()
 }, [username])


 const {
  avatarLink,
  FullName,
  Bio,
  Email,
  BirthDate,
  Gender,
  CurrentAdd,
  UserID,
 } = profileData

 // const [avatarUrl, setAvatarUrl] = useState(() => {
 //   return localStorage.getItem('avatarUrl') || avatarLink
 // })

 // useEffect(() => {
 //   const savedAvatarUrl = localStorage.getItem('avatarUrl')
 //   if (savedAvatarUrl) {
 //     setAvatarUrl(savedAvatarUrl)
 //   }
 // }, [])

 return (
  <div style={background}>
   <Header1 />
   <div className='flex items-center justify-center mt-10 max-w-[500px] mx-auto'>
    <Card className='rounded-2xl overflow-hidden border-4  border-green-500'>
     <CardHeader
      style={{
       background: `center/cover no-repeat  url(${bgProfile})`,
       height: '150px',
      }}
      floated={false}
      className='relative flex items-center justify-center rounded-none m-0'
     ></CardHeader>
     <CardBody className=' flex flex-col justify-center text-center'>
      <div className='mx-auto mt-[-100px] z-[1]'>
       <img
        src={AVATAR_DEFAULT_MALE || avatarLink}
        alt='profile'
        className='rounded-full h-[130px] w-[130px] object-cover  border-4 border-pink-100'
       />
      </div>
      <div className='mt-4'>
       <h4 className='mx-auto text-black font-bold text-xl capitalize'>
        {FullName}
       </h4>

       <p
        className='mb-2 text-md italic text-gray-600'
        style={{ overflowWrap: 'break-word' }}
       >
        {Bio}
       </p>
       <Typography
        color='white'
        className='flex items-center justify-center mt-2 text-black w-max'
        textGradient
       >
        <FaEnvelope className='mr-3' />
        {Email}
       </Typography>
       <Typography
        color='white'
        className='flex items-center justify-center mt-2 text-black w-max'
        textGradient
       >
        <FaBirthdayCake className='mr-3' />
        {BirthDate}
       </Typography>
       <Typography
        color='white'
        className='flex items-center justify-center mt-2 text-black w-max'
        textGradient
       >
        <FaMale className='mr-3' />
        {Gender || null}
       </Typography>
       <Typography
        color='white'
        className='flex items-center justify-center mt-2 text-black w-max'
        textGradient
       >
        <FaAd className='mr-3' />
        {CurrentAdd}
       </Typography>
      </div>
     </CardBody>

     <CardFooter className='flex justify-center gap-7 pt-0'>
      <button
       className={`px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-green-400 duration-200 ${
        username !== userName ? 'cursor-not-allowed opacity-70' : ''
       }`}
       onClick={() => username === userName && setIsModalOpenChangePass(true)}
      >
       Change Password
      </button>
      <button
       className='flex px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-green-400 duration-200'
       onClick={() => {
        username === userName
         ? navigate('/personal')
         : navigate(`/home/message/${UserID}`, {
            state: {
             userName: FullName,
             isOnline: true,
             userId: userID,
            },
           })
       }}
      >
       {username !== userName ? 'Nhắn tin' : 'Edit'}
      </button>
     </CardFooter>
    </Card>
   </div>

   <FormChangePassword
    userId={UserID}
    isOpen={isModalOpenChangePass}
    onClose={() => setIsModalOpenChangePass(false)}
   />
   <Footer />
  </div>
 )
}

export default Profile
