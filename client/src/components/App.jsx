import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './UI/navbar/Navbar.jsx'
import './app.css'
import Footer from './UI/footer/Footer.jsx'
import StockList from './content/StockList.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../actions/user.js'
import { useEffect } from 'react'
import Account from './account/Account.jsx'
import WalletList from './wallet/WalletList'
import { SearchContext } from '../context/index.js'
import Portfolio from './portfolio/Portfolio.jsx'

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
          {!isAuth && (
            <Routes>
              <Route path="/" element={<Navigate to="/stocks" />}></Route>
              <Route />
              <Route path="/stocks" element={<StockList title="Каталог акций" />} />

              <Route
                path="*"
                element={
                  <div className="page404__container">
                    <p className="page404_num">404</p>
                    <p className="page404">There's nothing here!</p>
                  </div>
                }
              />
            </Routes>
          )}
          {isAuth && (
            <Routes>
              <Route path="/" element={<Navigate to="/stocks" />}></Route>
              <Route />
              <Route path="/stocks" element={<StockList title="Каталог акций" />} />
              <Route path="/account" element={<Account />} />
              <Route path="/wallet" element={<WalletList title1="Ваш баланс" title2="История изменений" />} />
              <Route path="/portfolio" element={<Portfolio title="Ваши инвестиции" />} />
              <Route
                path="*"
                element={
                  <div className="page404__container">
                    <p className="page404">404</p>
                    <p>There's nothing here!</p>
                  </div>
                }
              />
            </Routes>
          )}
          <Footer />
        </div>
      </BrowserRouter>
    </SearchContext.Provider>
  )
}

export default App
