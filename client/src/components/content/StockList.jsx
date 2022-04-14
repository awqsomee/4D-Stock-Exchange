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
import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'
import { useDispatch } from 'react-redux'

const StockList = (props) => {
  const [stocks, setStocks] = useState([])
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const { search, setSearch } = useContext(SearchContext)
  const [GET_POSTS_LINK, setGET_POSTS_LINK] = useState([
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo`,
  ])
  const dispatch = useDispatch()
  const quantity = 1

  // useEffect(() => {
  //   getStocks()
  // }, [])

  useEffect(() => {
    getStocks()
    if (!search) setGET_POSTS_LINK(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo`)
    else
      setGET_POSTS_LINK(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=ACBVRHUCTP4LTHVX`
      )
  }, [search])

  async function getStocks() {
    try {
      setIsStocksLoading(true)
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
      // const cockInfo = [
      //   { number: 0, symbol: 'AAPL', name: 'Apple Inc', currency: 'USD' },
      //   { number: 1, symbol: 'AAPL34.SAO', name: 'Apple Inc', currency: 'BRL' },
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
          if (index < 4) price = Number(await getStockPrice(item.symbol, 'KQRHNIOUP58ZY3G3'))

          return {
            ...item,
            price: price,
          }
        })
      )
      setStocks(stocksInfoWithPrice)
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

  const buyStock = (symbol, quantity) => {
    return async (dispatch) => {
      try {
        console.log('adad')
        const response = await axios.post(
          'http://localhost:5000/api/auth/stock',
          { symbol, quantity },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
          }
        )
        alert(response.data)
      } catch (e) {
        alert(e.response.data.message)
      }
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
