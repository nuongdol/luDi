import { Button, IconButton } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../images/logoApp.png'

const Header = () => {
  const [openNav, setOpenNav] = useState(false)
  const isLogin = localStorage.getItem('IuDiToken')
  const username = localStorage.getItem('UserNameIuDi')

  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const navList = [
    {
      name: 'Home',
      link: '/home',
      id: 1,
    },

    {
      name: 'Finding',
      link: '/finding',
      id: 2,
    },

    {
      name: 'Post',
      link: '/posts/1',
      id: 3,
    },

    {
      name: 'Profile',
      link: `/profile/${username}`,
      id: 4,
    },

    {
      name: 'Message',
      link: '/message',
      id: 5,
    },
  ]

  return (
    <div className="">
      <div className="text-white pb-[100px]">
        <div className="fixed left-0 right-0 z-10 flex items-center justify-between text-white">
          <Link to="/" className="mr-4 py-1.5 px-3 font-medium">
            <img src={Logo} alt="Example" />
          </Link>
          <div className="flex items-center gap-4 ">
            <div className="hidden mr-4 lg:block">
              <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {navList.map(({ name, link, id }) => (
                  <li key={id}>
                    <Link className="p-1 font-normal" to={link}>
                      {name}
                    </Link>
                  </li>
                ))}

                {isLogin && (
                  <li>
                    <p>Chào mừng {username}</p>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex items-center gap-x-1">
              {!isLogin ? (
                <Button
                  variant="text-white"
                  size="sm"
                  className="hidden mr-4 lg:inline-block"
                  onClick={() => navigate('/login')}
                >
                  <span>Log In</span>
                </Button>
              ) : (
                // eslint-disable-next-line no-restricted-globals
                <Button
                  variant="text-white"
                  size="sm"
                  className="hidden mr-4 lg:inline-block"
                  onClick={() => {
                    if (window.confirm('Are you sure ? ')) {
                      localStorage.removeItem('IuDiToken')
                      navigate('/')
                    }
                  }}
                >
                  <span>Log Out</span>
                </Button>
              )}

              {isLogin ? (
                ''
              ) : (
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden mr-4 lg:inline-block"
                  onClick={() => navigate('/register')}
                >
                  <span>Sign up</span>
                </Button>
              )}
            </div>
            <IconButton
              variant="text"
              className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        {/* <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {isLogin ? (
              <Button
                fullWidth
                variant="text-white"
                size="sm"
                className=""
                onClick={handleLogout}
              >
                <span>Log Out</span>
              </Button>
            ) : (
              <Button
                fullWidth
                variant="text-white"
                size="sm"
                className=""
                onClick={handleLogin}
              >
                <span>Log In</span>
              </Button>
            )}
          </div>
        </MobileNav> */}
      </div>
    </div>
  )
}
export default Header
