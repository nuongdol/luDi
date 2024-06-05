import { Route, Routes } from 'react-router-dom'
import './App.css'

import AuthLayout from './_auth/AuthLayout'
import ForgotPassword from './_auth/forms/ForgotPassword'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'

import HomeLayout from './_root/HomeLayout'
import RootLayout from './_root/RootLayout'
import {
    EditProfile,
    Group,
    Home,
    Personal,
    Profile
} from './_root/pages'
import Message from './components/shared/Message'

function App() {
 return (
  <main>
   <Routes>
    {/* public routes */}
    <Route path='/' element={<AuthLayout />}>
     <Route path='register' element={<SignupForm />} />
     <Route path='login' element={<SigninForm />} />
     <Route path='forgot-password' element={<ForgotPassword />} />
    </Route>

    {/* private routes */}
    <Route element={<RootLayout />}>
     <Route path='/profile/:username' element={<Profile />} />
     <Route path='/personal' element={<Personal />} />
     <Route path='/profile/edit' element={<EditProfile />} />
     <Route path='/group/:slug/:groupId' element={<Group />}></Route>
    </Route>

    <Route path='/home' element={<HomeLayout />}>
     <Route path='' element={<Home />} />
     <Route path='message/:id' element={<Message />} />
    </Route>
   </Routes>
  </main>
 )
}

export default App
