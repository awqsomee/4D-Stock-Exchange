import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import '../StockList/stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { getUserStocks } from '../../actions/stocks.js'
// import './portfolio.css'
import Loader from '../UI/loader/Loader.jsx'

const Portfolio = (props) => {
  const [stocks, setStocks] = useState([])
  const [isStocksLoading, setIsStocksLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsStocksLoading(true)
    let ignore = false
    async function getStocks() {
      const result = await getUserStocks()
      if (!ignore) setStocks(result)
    }
    await getStocks()
    setIsStocksLoading(false)
    return () => {
      ignore = true
    }
  }

  return (
    <div className="stockList">
      <div className="title">{props.title}</div>
      <div className="container2">
        <div className="list">
          <Sorting />
          <Panel className="panel" />
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
          ) : stocks.length > 0 ? (
            stocks.map((stock) => (
              <Stock
                stock={stock}
                key={stock.symbol}
                changes={stock.changes}
                buttonText="Продать"
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
