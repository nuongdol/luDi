import axios from 'axios'
import React, { useEffect } from 'react'
// import Modal from "../Modal/Modal";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import loginSchema from '../../schemas/login'
import Logo from '../../images/logoApp.png'
import './styleSignin.css'

function SigninForm() {
  const {
    register,
    handleSubmit,
    // reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(loginSchema) })
  useEffect(() => {
    const fetchData = async () => {
      fetch('http://www.geoplugin.net/json.gp?ip')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setValue('Latitude', data.geoplugin_latitude)
          setValue('Longitude', data.geoplugin_longitude)
          setValue('LastLoginIP', data.geoplugin_request)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
    fetchData()
  }, [])

  const navigate = useNavigate()
  const handleLogin = async (data) => {
    console.log('data form:', data)

    if (isValid) {
      try {
        const response = await axios.post('https://api.iudi.xyz/api/login', data)

        console.log('response:', response)

        console.log('Phản hồi từ API:', response?.data)

        localStorage.setItem('IuDiToken', response?.data?.jwt)
        localStorage.setItem('UserId', response?.data?.user.Users[0].UserID)
        localStorage.setItem('UserNameIuDi', response?.data.user.Users[0].Username)

        localStorage.setItem(
          'InforCurrentUser',
          JSON.stringify(response?.data?.user.Users[0])
        )

        toast.success('Login successfully!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: 'light',
        })

        setTimeout(navigate('/personal', 5000))
      } catch (error) {
        console.error('Error registering:', error)
        toast.error(`Register failed! ${error.response.data.message}`, {
          closeOnClick: true,
        })
      }
    } else toast.warning('An error occur...')
  }

  return (

    <>
      <div
        className='login absolute inset-0 flex items-center justify-center'
        style={{ background: 'rgba(255, 255, 255, .3)' }}
      >
        <div className='login max-w-md w-full mx-auto border-2 border-green-400 rounded-[20px] bg-gray-900'>
          <form
            onSubmit={handleSubmit(handleLogin)}
            //  onSubmit={(e) => {
            //   e.preventDefault()
            //   handleSubmit(handleLogin)
            //  }}
            className='px-8 pt-6 pb-8 mb-4 rounded '
          >
            {/* <ToastContainer/> */}
            <h3
              style={{
                color: 'rgba(44,186,55,0.8127626050420168)',
              }}
              className='mt-2 mb-2 text-3xl font-extrabold text-center text-white'
            >
              LOGIN
            </h3>
            <div className='mb-4'>
              <label
                className='block mb-2 font-bold text-whitetext-sm'
                htmlFor='Username'
                style={{
                  color: 'rgba(44,186,55,0.8127626050420168)',
                }}
              >
                Username
              </label>
              <input
                className='w-full px-3 py-2 border rounded shadow appearance-none text-whiteleading-tight focus:outline-none focus:shadow-outline'
                id='Username'
                type='text'
                placeholder='Username'
                name='Username'
                {...register('Username')}
              />

              {errors.Username && (
                <p className='mt-2 text-sm font-bold text-red-500'>
                  {' '}
                  {errors.Username.message}{' '}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label
                className='block mb-2 font-bold text-whitetext-sm'
                htmlFor='Password'
                style={{
                  color: 'rgba(44,186,55,0.8127626050420168)',
                }}
              >
                Password
              </label>
              <input
                className='w-full px-3 py-2 border rounded shadow appearance-none text-whiteleading-tight focus:outline-none focus:shadow-outline'
                id='Password'
                type='password'
                placeholder='Password'
                name='Password'
                {...register('Password')}
              />
              {errors.Password && (
                <p className='mt-2 text-sm font-bold text-red-500'>
                  {' '}
                  {errors.Password.message}{' '}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <button
                style={{
                  background: 'rgba(44,186,55,0.8127626050420168)',
                }}
                className='w-full px-4 py-2 mt-2 font-bold text-white rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Login
              </button>
            </div>
            <p
              className='text-sm text-center text-white'
              style={{
                color: 'rgba(44,186,55,0.8127626050420168)',
              }}
            >
              Don't have an account ?
              <a href='/register' className='text-500'>
                <strong>REGISTER</strong>
              </a>
            </p>
            <p className='mt-2 text-center text-green-600'>
              <a href='/forgot-password' className='text-200'>
                <strong>Forgot password ?</strong>
              </a>
            </p>
          </form>
        </div>
      </div >
      {/* BS */}
      <div className="logmobile absolute inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.3)]">
        <div className="relative w-[375px] h-[812px] bg-white overflow-hidden">
          <div className="absolute w-[518px] h-[518px] left-[-195px] top-[-222px] bg-[rgba(0,135,72,0.7)] rounded-full"></div>
          <div className="absolute w-[200px] h-[105px] left-[34px] top-[97px]">
            <img src={Logo} alt="Your" className="w-[200px]" />
          </div>
          <p className="absolute text-white font-light text-[18px] leading-[27px] tracking-[-0.3px] text-center w-[160px] h-[27px] top-[186px] left-[34px]">
            Kết nối yêu thương
          </p>
          <div className="absolute w-[254px] h-[254px] left-[219px] top-[-30px] bg-[rgba(20,145,87,0.9)] rounded-full"></div>
          <div className="relative w-[343px] h-[188px] left-[16px] top-[304px] border-none">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-1">
                <label className="block font-bold text-black text-sm" htmlFor="hoten">Họ tên</label>
                <input
                  className="w-full px-2 py-1 border-2 border-gray-300 rounded-full focus:outline-none focus:shadow-outline"
                  id="hoten"
                  type="text"
                  placeholder="Họ tên"
                  name="hoten"
                  {...register('Name')}
                />
                {errors.Name && (
                  <p className="mt-2 text-sm font-bold text-red-500">{errors.Name.message}</p>
                )}
              </div>
              <div className="mb-1">
                <label className="block font-bold text-black text-sm" htmlFor="password">Mật khẩu</label>
                <input
                  className="w-full px-2 py-1 border-2 border-gray-300 rounded-full focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="Password"
                  {...register('Password')}
                />
                {errors.Password && (
                  <p className="mt-2 text-sm font-bold text-red-500">{errors.Password.message}</p>
                )}
              </div>
              <div className="mb-1 flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border border-black rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-1 text-sm">
                  <label className="block font-bold text-black text-sm" htmlFor="remember"><small>Ghi nhớ mật khẩu</small></label>
                </div>
              </div>
              <div className="mb-1">
                <button
                  className="w-full px-2 py-1 font-bold text-white rounded-full focus:outline-none focus:shadow-outline"
                  style={{ background: 'rgba(0, 135, 72, 1)' }}
                  type="submit">Đăng nhập</button>
              </div>
            </form>
          </div>
          <div className="absolute w-[228px] h-[21px] left-[74px] top-[739px] font-medium text-sm leading-[21px]">
            <div className="mb-16">
              <p className="text-sm text-center mb-4 text-black">
                Bạn chưa có tài khoản?{' '}
                <a href="/register" className="text-500">
                  <strong className="text-[rgba(0,135,72,1)]">Đăng ký</strong>
                </a>
              </p>
            </div>
          </div>
          <div className="absolute w-[134px] h-[5px] left-[120px] top-[778px] bg-black rounded-[2.5px] opacity-80"></div>
        </div>
      </div>

    </>
  )
}
export default SigninForm
