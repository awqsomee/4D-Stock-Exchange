import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import slice from './redux/slice'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/UI/navbar/Navbar'
import StockList from './components/StockList/StockList'
import Account from './components/Account/Account'
import WalletList from './components/WalletList/WalletList'
import Portfolio from './components/Portfolio/Portfolio'
import { auth } from './actions/user'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.toolkit.isAuth)

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
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
                  <p className="page404_num">404</p>
                  <p className="page404">There's nothing here!</p>
                </div>
              }
            />
          </Routes>
        )}
        <footer />
      </div>
    </BrowserRouter>
  )
}

export default App
