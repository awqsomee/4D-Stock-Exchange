import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './navbar/Navbar.jsx'
import './app.css'
import './navbar/navbar.css'
import Registration from './registration/Registration.jsx'
import Login from './login/Login.jsx'
import Footer from './footer/Footer.jsx'
import Content from './content-main-page/content/Content'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../actions/user.js'
import { useEffect } from 'react'

function App() {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stocks" element={<Content />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
