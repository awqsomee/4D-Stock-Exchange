import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { auth } from './actions/auth'
import Navbar from './components/navbar/Navbar'
import StockList from './components/StockList/StockList'
import Account from './components/account/Account'
import Currency from './components/currency/Currency'
import Portfolio from './components/portfolio/Portfolio'
import Footer from './components/UI/footer/Footer'
import './app.css'
import PageLoader from './components/UI/loader/PageLoader'

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [widthClient, setWidthClient] = useState()
  const isAuth = useSelector((state) => state.toolkit.isAuth)

  useEffect(() => {
    if (localStorage.getItem('stonksToken')) {
      setIsLoading(true)
      dispatch(auth()).finally(() => setIsLoading(false))
    } else setIsLoading(false)
  }, [])

  //считает ширину окна без прокрутки
  const setWidthPage = () => {
    let widthClient = window.innerWidth - document.documentElement.clientWidth
    // setWidthClient(window.innerWidth - document.documentElement.clientWidth)
    if (widthClient == 0) {
      document.getElementById('root').style['padding-right'] = 0
    }
    return widthClient
  }

  //useMemo чтобы при каждом изменении ставились значения, не работает
  //классу тоже не назначается значение
  useEffect(() => {
    setWidthPage()

    console.log(window.innerWidth, document.documentElement.clientWidth, widthClient)
  }, [document.documentElement.clientWidth])

  return (
    <BrowserRouter basename="/4D-Stock-Exchange">
      {!isLoading ? (
        <div className="app">
          <Navbar />
          <div className="wrap">
            {!isAuth && (
              <Routes>
                <Route path="/stocks" element={<StockList title="Каталог акций" />} />
                <Route path="*" element={<Navigate to="/stocks" />} />
              </Routes>
            )}
            {isAuth && (
              <Routes>
                <Route path="/stocks" element={<StockList title="Каталог акций" />} />
                <Route path="/account" element={<Account title="Профиль" />} />
                <Route path="/wallet" element={<Currency title="Кошелек" />} />
                <Route path="/portfolio" element={<Portfolio title="Ваши инвестиции" />} />
                <Route path="*" element={<Navigate to="/stocks" />} />
              </Routes>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <div className="app loading">
          <PageLoader />
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
