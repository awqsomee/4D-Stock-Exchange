import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './stocklist.css'
import Stock from '../stocks/Stock.jsx'
import axios from 'axios'
import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'
import { useDispatch } from 'react-redux'
import { buyStock } from '../../actions/user.js'
import { getStocksSearch } from '../../actions/stocks.js'

const StockList = (props) => {
  const [stocks, setStocks] = useState([])
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const { search, setSearch } = useContext(SearchContext)
  const dispatch = useDispatch()
  const quantity = 1

  useEffect(() => {
    fetchData()
  }, [search])

  const fetchData = async () => {
    setIsStocksLoading(true)
    let ignore = false
    async function getStocks() {
      const result = await getStocksSearch()
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
            <Stock
              stock={stock}
              function={buyStock}
              dispatch={dispatch}
              quantity={quantity}
              key={stock.symbol}
              buttonText="Купить"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StockList
