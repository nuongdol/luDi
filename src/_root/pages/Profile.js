import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaAd, FaBirthdayCake, FaEnvelope, FaMale } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/shared/Footer'
import Header1 from '../../components/header/Header1'
import ModalChangePassWord from '../../components/shared/ModalChangePassWord'
import NotFound from '../../components/shared/NotFound'
import bg from '../../images/bg3.jpg'

import configs from '../../configs/Configs.json'

const { AVATAR_DEFAULT_MALE, AVATAR_DEFAULT_FEMALE } = configs

function Profile() {
  const [profileData, setProfileData] = useState({})
  const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false)

  const isLogin = localStorage.getItem('IuDiToken')
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
          `https://api.iudi.xyz/api/profile/${userName}`
        )
        setProfileData(response.data.Users[0])

        console.log(response.data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchProfileData()
  }, [userName])

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
    <>
      {!isLogin ? (
        <NotFound />
      ) : (
        <div style={background}>
          <Header1 />
          <div className="flex items-center justify-center mt-10">
            <Card className="rounded-2xl p-[20px] border-4 bg-black border-green-500">
              <CardHeader
                floated={false}
                className="flex items-center justify-center bg-black"
              >
                <img
                  src={avatarLink || AVATAR_DEFAULT_MALE}
                  alt="profile"
                  className="rounded-full h-[150px] w-[150px] hover:cursor-pointer object-cover  border-4 bg-black border-green-500"
                />
              </CardHeader>
              <CardBody className="flex flex-col justify-center text-center">
                <Typography variant="h4" className="mx-auto mb-2 text-white">
                  {FullName}
                </Typography>
                <Typography
                  variant="p"
                  className="mb-2 text-lg italic text-white"
                >
                  {Bio}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center justify-center mt-2 text-white w-max"
                  textGradient
                >
                  <FaEnvelope className="mr-3" />
                  {Email}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center justify-center mt-2 text-white w-max"
                  textGradient
                >
                  <FaBirthdayCake className="mr-3" />
                  {BirthDate}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center justify-center mt-2 text-white w-max"
                  textGradient
                >
                  <FaMale className="mr-3" />
                  {Gender || null}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center justify-center mt-2 text-white w-max"
                  textGradient
                >
                  <FaAd className="mr-3" />
                  {CurrentAdd}
                </Typography>
              </CardBody>

              <CardFooter className="flex justify-center pt-2 gap-7">
                <button
                  className="px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-white hover:text-black"
                  onClick={() => setIsModalOpenChangePass(true)}
                >
                  Change Password
                </button>
                <button
                  className="flex px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-white hover:text-black"
                  onClick={() => navigate('/personal')}
                >
                  Edit Profile
                </button>
              </CardFooter>
            </Card>
          </div>

          <ModalChangePassWord
            userId={UserID}
            isOpen={isModalOpenChangePass}
            onClose={() => setIsModalOpenChangePass(false)}
          />
          <Footer />
        </div>
      )}
    </>
  )
}

export default Profile
