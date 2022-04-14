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
  }, [search])

  let GET_POSTS_LINK = `https://gentle-sea-62964.herokuapp.com/api/auth/stock`

  async function getStocks() {
    try {
      setIsStocksLoading(true)
      const response = await axios.get(GET_POSTS_LINK, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      const stocksInfo = response.data
      const stocksInfoWithPrice = await Promise.all(
        stocksInfo.map(async (item, index) => {
          let price
          if (index < 5) price = Number(await getStockPrice(item.symbol, 'KQRHNIOUP58ZY3G3'))
          return {
            number: index + 1,
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
              dispatched={dispatch}
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
