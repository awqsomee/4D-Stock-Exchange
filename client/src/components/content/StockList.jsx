import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
// import Logo from '../../assets/image/logo.svg';
// import Input from '../../../utils/input/Input';
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './stocklist.css'
import Stock from '../stocks/Stock.jsx'
import axios from 'axios'
import Graph_panel from '../grahp-panel/Graph_panel.jsx'

const StockList = (props) => {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    getStocks()
  }, [])

  let GET_POSTS_LINK
  if (!props.srch) GET_POSTS_LINK = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo'
  else
    GET_POSTS_LINK = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${props.keywords}&apikey=ACBVRHUCTP4LTHVX`

  async function getStocks() {
    try {
      const response = await axios.get(GET_POSTS_LINK)
      const stocksInfo = response.data['bestMatches'].map((item, index) => {
        return {
          number: index + 1,
          symbol: item['1. symbol'],
          name: item['2. name'],
          currency: item['8. currency'],
        }
      })
      while (stocksInfo.length > 4) stocksInfo.pop()
      console.log(stocksInfo)

      // const cockInfo = [
      //   { number: 0, symbol: 'AAPL',           name: 'Apple Inc',             currency: 'USD' },
      //   { number: 1, symbol: 'AAPL34.SAO',     name: 'Apple Inc',             currency: 'BRL' },
      //   { number: 2, symbol: 'AAPLUSTRAD.BSE', name: 'AA Plus Tradelink Ltd', currency: 'INR' },
      // ]

      // stocksInfo.forEach((element) => console.log(element.symbol))

      const stocksInfoWithPrice = await Promise.all(
        stocksInfo.map(async (item, index) => {
          // let apikey
          // if (index < 4) apikey = 'KQRHNIOUP58ZY3G3'
          // else if (index > 6) apikey = 'AP6O2CY6RJETBYAM'
          // else apikey = '6OBLQLSC72R7ZSW8'
          let price
          if (index < 4) price = await getStockPrice(item.symbol, 'KQRHNIOUP58ZY3G3')
          else price = await getOurStockPrice(item.symbol)
          console.log(price)
          return {
            ...item,
            price: price,
          }
        })
      )
      setStocks(stocksInfoWithPrice)
    } catch (e) {
      console.log(e)
    }
  }

  async function getStockPrice(symbol, apikey) {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
      )
      console.log(response.data)
      return response.data['Global Quote']['05. price']
    } catch (e) {
      console.log(e)
    }
  }

  async function getOurStockPrice(symbol) {
    try {
      const response = await axios.get(`https://gentle-sea-62964.herokuapp.com/api/stock?symbol=${symbol}`)
      console.log(response.data)
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
          {stocks.map((stock) => (
            <Stock stock={stock} key={stock.symbol} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StockList
