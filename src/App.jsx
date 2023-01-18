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
  const [modalBoxLog, setModalBoxLog] = useState(false)
  // const [modalBoxDepositAuth, setmodalBoxDepositAuth] = useState(false)
  const isAuth = useSelector((state) => state.toolkit.isAuth)
  const isServiceUnavailable = useSelector((state) => state.toolkit.isServiceUnavailable)

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
  }, [document.documentElement.clientWidth])

  if (false)
    return (
      <BrowserRouter basename="/4D-Stock-Exchange">
        {!isLoading ? (
          <div className="app">
            <Navbar modalBoxLog={modalBoxLog} setModalBoxLog={setModalBoxLog} />
            <div
              style={{
                backgroundColor: '#202020',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '75px',
                zIndex: -15,
                fontSize: '16px',
                fontFamily: "'Exo 2', 'Arial'",
                padding: '30px',
              }}
            >
              Сервер не отвечает, но вы можете посмотреть, как бы это примерно выглядело при
              работающем сервере
            </div>
            <div className="wrap">
              <Routes>
                <Route path="/stocks" element={<StockList title="Каталог акций" />} />
                <Route path="/account" element={<Account title="Профиль" />} />
                <Route path="/wallet" element={<Currency title="Кошелек" />} />
                <Route path="/portfolio" element={<Portfolio title="Ваши инвестиции" />} />
                <Route path="*" element={<Navigate to="/stocks" />} />
              </Routes>
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

  return (
    <BrowserRouter basename="/4D-Stock-Exchange">
      {!isLoading ? (
        <div className="app">
          <Navbar modalBoxLog={modalBoxLog} setModalBoxLog={setModalBoxLog} />
          <div className="wrap">
            {!isAuth && (
              <Routes>
                <Route
                  path="/stocks"
                  element={
                    <StockList
                      title="Каталог акций"
                      modalBoxLog={modalBoxLog}
                      setModalBoxLog={setModalBoxLog}
                    />
                  }
                />
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
