import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import '../content/stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { getUserStocks } from '../../actions/stocks.js'

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
    console.log(stocks)
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>Акции загружаются...</div>
          ) : (
            <></>
          )}
          {stocks.map((stock) => (
            <Stock stock={stock} key={stock.symbol} changes={stock.changes} buttonText="Продать" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
