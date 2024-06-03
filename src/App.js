import './App.css'
import { Route, Routes } from 'react-router-dom'

import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import ForgotPassword from './_auth/forms/ForgotPassword'

import RootLayout from './_root/RootLayout'
import {
 Home,
 Profile,
 Finding,
 Personal,
 EditProfile,
 Group,
} from './_root/pages'
import HomeLayout from './_root/HomeLayout'
import GroupDetail from './components/shared/GroupDetail/GroupDetail'
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
     <Route path='/finding' element={<Finding />} />
     <Route path='/profile/:username' element={<Profile />} />
     <Route path='/personal' element={<Personal />} />
     <Route path='/profile/edit' element={<EditProfile />} />
    </Route>

    <Route path='/home' element={<HomeLayout />}>
     <Route path='' element={<Home />} />
     <Route path='message/:id' element={<Message />} />
    </Route>

    <Route path='/group' element={<Group />}>
     <Route path=':slug/:groupId' element={<GroupDetail />} />
    </Route>
   </Routes>
  </main>
 )
}

export default App
