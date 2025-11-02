import { useState } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home />} />
        {/* <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} /> */}
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
