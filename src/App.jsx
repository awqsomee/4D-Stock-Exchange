import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { auth } from './actions/user'
import Navbar from './components/UI/navbar/Navbar'
import StockList from './components/StockList/StockList'
import Account from './components/account/Account'
import WalletList from './components/WalletList/WalletList'
import Portfolio from './components/portfolio/Portfolio'
import './app.css'

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(auth()).finally(() => setIsLoading(false))
  }, [])

  const isAuth = useSelector((state) => state.toolkit.isAuth)

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      {!isLoading ? (
        <div className="app">
          <Navbar />
          {!isAuth && (
            <Routes>
              <Route path="/stocks" element={<StockList title="Каталог акций" />} />
              <Route path="*" element={<Navigate to="/stocks" />} />
            </Routes>
          )}
          {isAuth && (
            <Routes>
              <Route path="/stocks" element={<StockList title="Каталог акций" />} />
              <Route path="/account" element={<Account />} />
              <Route path="/wallet" element={<WalletList />} />
              <Route path="/portfolio" element={<Portfolio title="Ваши инвестиции" />} />
              <Route path="*" element={<Navigate to="/stocks" />} />
            </Routes>
          )}
          <footer />
        </div>
      ) : (
        <div></div>
      )}
    </HashRouter>
  )
}

export default App
