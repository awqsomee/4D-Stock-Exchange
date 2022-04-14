import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import '../content/stocklist.css'
import Stock from '../stocks/Stock.jsx'
import axios from 'axios'
import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'

const Portfolio = (props) => {
  const [stocks, setStocks] = useState([])
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const { search, setSearch } = useContext(SearchContext)

  useEffect(() => {
    getStocks()
  }, [search])

  let GET_POSTS_LINK = `https://gentle-sea-62964.herokuapp.com/api/auth/stock`

  async function getStocks() {
    try {
      setIsStocksLoading(true)
      const response = await axios.get(GET_POSTS_LINK, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      const stockInfo = response.data

      // const cockInfo = [
      //   {
      //     _id: '6258563fb6fa89c69a6bfd99',
      //     symbol: 'IBM',
      //     name: 'International Business Machines Corp',
      //     marketOpen: '09:30',
      //     marketClose: '16:00',
      //     timezone: 'UTC-04',
      //     currency: 'USD',
      //     quantity: 10,
      //   },
      //   {
      //     _id: '62585700bea8e38609cebb47',
      //     symbol: 'BA',
      //     name: 'Boeing Company',
      //     marketOpen: '09:30',
      //     marketClose: '16:00',
      //     timezone: 'UTC-04',
      //     currency: 'USD',
      //     quantity: 30,
      //   },
      // ]
      // while (stocksInfo.length > 4) stocksInfo.pop()
      // const cockInfo = [
      //   { number: 0, symbol: 'AAPL', name: 'Apple Inc', currency: 'USD' },
      //   { number: 1, symbol: 'AAPL34.SAO', name: 'Apple Inc', currency: 'BRL' },
      //   { number: 2, symbol: 'AAPLUSTRAD.BSE', name: 'AA Plus Tradelink Ltd', currency: 'INR' },
      // ]

      // const stocksInfoWithPrice = await Promise.all(
      //   stocksInfo.map(async (item, index) => {
      //     let price
      //     if (index < 4) price = await getStockPrice(item.symbol, 'KQRHNIOUP58ZY3G3')
      //     else price = await getOurStockPrice(item.symbol)
      //     return {
      //       ...item,
      //       price: price,
      //     }
      //   })
      // )
      setStocks(stockInfo)
      setIsStocksLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  async function getStockPrice(symbol, apikey) {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
      )
      return response.data['Global Quote']['05. price']
    } catch (e) {
      console.log(e.message)
    }
  }

  async function getOurStockPrice(symbol) {
    try {
      const response = await axios.get(`https://gentle-sea-62964.herokuapp.com/api/stock?symbol=${symbol}`)
      return response.data['Global Quote']['05. price']
    } catch (e) {
      console.log(e)
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
            <Stock stock={stock} key={stock.symbol} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
