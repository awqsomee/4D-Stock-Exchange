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
import Graph_panel from '../grahp-panel/Graph_panel.jsx'

const StockList = (props) => {
  const [stocks, setStocks] = useState([])
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const { search, setSearch } = useContext(SearchContext)
  const dispatch = useDispatch()
  const quantity = 1

  // useEffect(() => {
  //   getStocks()
  // }, [])

  useEffect(() => {
    getStocks()
  }, [search])

  async function getStocks() {
    try {
      setIsStocksLoading(true)
      const response = await axios.get(
        // `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=ACBVRHUCTP4LTHVX`
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo`
      )
      const stocksInfo = response.data['bestMatches'].map((item, index) => {
        return {
          number: index + 1,
          symbol: item['1. symbol'],
          name: item['2. name'],
          currency: item['8. currency'],
        }
      })

      const stocksInfoWithPrice = await Promise.all(
        stocksInfo.map(async (item) => {
          let data = await getStockPrice(item.symbol)
          return {
            ...item,
            data,
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
        // 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=ACBVRHUCTP4LTHVX'
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo'
      )
      let date = Object.keys(response.data['Time Series (Daily)'])
      date.reverse()
      const value = date.map((item) => Number(response.data['Time Series (Daily)'][item]['4. close']))
      const data = []
      for (let num = 99; num >= 0; num--)
        data.unshift({
          date: date,
          value: value[num],
        })
      return data
    } catch (e) {
      console.log(e.message)
    }
  }

  const buyStock = (symbol, quantity) => {
    return async (dispatch) => {
      try {
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
