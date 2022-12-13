import React, { useEffect, useMemo, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import '../StockList/stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { getUserStocks } from '../../actions/stocks.js'
// import './portfolio.css'
import Loader from '../UI/loader/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/index.js'
import PanelPortfolio from '../panel/PanelPortfolio.jsx'
import StockPortfolio from '../stocks/StockPortfolio.jsx'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit.jsx'
import InfoCard from './InfoCard.jsx'
import { setAccountUser } from '../../redux/slice.jsx'
import InfoBlock from './InfoBlock.jsx'

const Portfolio = (props) => {
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState(false)
  const dispatch = useDispatch()
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)
  let stocks = useSelector((state) => state.toolkit.userStocks)
  const [income, setIncome] = useState(0)

  useEffect(() => {
    setIncome(0)
    document.title = 'STONKS: Портфель'
    setIsStocksLoading(true)
    dispatch(getUserStocks()).finally(() => {
      setIsStocksLoading(false)
    })
  }, [])

  useEffect(() => {
    if (modalBoxDeposit) {
      const timeId = setTimeout(() => {
        setmodalBoxDeposit(false)
      }, 1500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [modalBoxDeposit])

  const sorting = (a, b) => {
    const value = filter
    if ((value != '') & (value === 'change')) {
      if (sort) {
        if (Number((a.prices[0].high - a.prices[1].high) / 100) > Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return 1
        }
        if (Number((a.prices[0].high - a.prices[1].high) / 100) < Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return -1
        }
        return 0
      } else {
        if (Number((a.prices[0].high - a.prices[1].high) / 100) > Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return -1
        }
        if (Number((a.prices[0].high - a.prices[1].high) / 100) < Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return 1
        }
        return 0
      }
    } else if ((value != '') & (value === 'name')) {
      if (sort) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        return 0
      } else {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1
        }
        return 0
      }
    }
  }
  const sortedStocks = useMemo(() => {
    return [...stocks].sort(sorting)
  }, [filter, sort, stocks])

  return (
    <div className="stockList">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <div className="container2">
        <div className="title">{props.title}</div>
        <InfoBlock stocks={stocks} income={income} setIncome={setIncome}></InfoBlock>
        <div className="list">
          <Sorting setFilter={setFilter} setSort={setSort} />
          <PanelPortfolio className="panel" />
          {isStocksLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 40,
              }}
            >
              <Loader></Loader>
            </div>
          ) : sortedStocks.length > 0 ? (
            sortedStocks.map((stock) => (
              <StockPortfolio
                stock={stock}
                key={stock.symbol}
                changes={stock.changes}
                buttonText="Продать"
                modalBoxDeposit={modalBoxDeposit}
                setmodalBoxDeposit={setmodalBoxDeposit}
              />
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 40,
              }}
            >
              У вас нет приобретенных акций
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
