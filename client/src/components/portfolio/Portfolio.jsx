import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import '../content/stocklist.css'
import Stock from '../stocks/Stock.jsx'
import axios from 'axios'
import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'
import { useDispatch } from 'react-redux'

const Portfolio = (props) => {
  const [stocks, setStocks] = useState([])
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const { search, setSearch } = useContext(SearchContext)
  const dispatch = useDispatch()

  let quantity = 1

  useEffect(() => {
    getStocks()
  }, [])

  async function getStocks() {
    try {
      setIsStocksLoading(true)
      const response = await axios.get(`https://gentle-sea-62964.herokuapp.com/api/auth/stock`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      const stocksInfo = response.data
      const stocksInfoWithPrice = await Promise.all(
        stocksInfo.map(async (item, index) => {
          let data = await getStockPrice(item.symbol)
          return {
            number: index + 1,
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

  const sellStock = (symbol, quantity) => {
    return async (dispatch) => {
      try {
        console.log('adad')
        const response = await axios.delete(
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
              function={sellStock}
              dispatch={dispatch}
              quantity={quantity}
              key={stock.symbol}
              buttonText="Продать"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
