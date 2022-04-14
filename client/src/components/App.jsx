import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
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
import WalletList from './wallet/WalletList'
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
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/stocks" />}></Route>
            <Route />
            <Route path="/stocks" element={<StockList title="Каталог акций" srch="" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wallet" element={<WalletList title1="Ваш баланс" title2="История изменений" />} />
            <Route
              path="*"
              element={
                <main className="page404">
                  <h1>404</h1>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </SearchContext.Provider>
  )
}

export default App
