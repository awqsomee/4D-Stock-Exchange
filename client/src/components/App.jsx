import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './UI/navbar/Navbar.jsx'
import './app.css'
import Registration from './authentification/registration/Registration.jsx'
import Login from './authentification/login/Login.jsx'
import Footer from './UI/footer/Footer.jsx'
import StockList from './content/StockList.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../actions/user.js'
import { useEffect } from 'react'
import Account from './account/Account.jsx'
import { SearchContext } from '../context/index.js'

function App() {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  console.log(search)

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      <BrowserRouter>
        <div className="app">
          <Navbar search={search} />
          <Routes>
            <Route path="/stocks" element={<StockList title="Каталог акций" search={search} />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </SearchContext.Provider>
  )
}

export default App
