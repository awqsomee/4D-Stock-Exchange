import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
// import Logo from '../../assets/image/logo.svg';
// import Input from '../../../utils/input/Input';
// import Sorting from '../sorting/Sorting.jsx'
import axios from 'axios'
import History from '../history/History'
import Balance from '../balance/Balance'

// const cockInfo = [
//   { number: 0, symbol: 'AAPL', name: 'Apple Inc', currency: 'USD' },
//   { number: 1, symbol: 'AAPL34.SAO', name: 'Apple Inc', currency: 'BRL' },
//   { number: 2, symbol: 'AAPLUSTRAD.BSE', name: 'AA Plus Tradelink Ltd', currency: 'INR' },
// ]

const WalletList = (props) => {
  const [wallet, setHistory] = useState([])

  useEffect(() => {
    getHistory()
  }, [])

  let GET_POSTS_LINK
  // ////if (!props.srch)
  GET_POSTS_LINK = `https://gentle-sea-62964.herokuapp.com/api/`
  ////// else
  //   GET_POSTS_LINK = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${props.keywords}&apikey=ACBVRHUCTP4LTHVX`

  async function getHistory() {
    try {
      // const response = await axios.get(GET_POSTS_LINK)
      // const historyInfo = response.data['bestMatches'].map((item) => {
      //   return {
      //     type: item['type'],
      //     name: item['name'],
      //     count: item['count'],
      //     summ: item['summ'],
      //     date: item['date'],
      //     symbol: item['symbol'],
      //   }
      // })
      // while (historyInfo.length > 4) historyInfo.pop()
      // console.log(historyInfo)
      const cockInfo = [
        { type: 'Sale', name: 'Apple Inc', count: 2, summ: '2 510', date: 'dd.mm.yyyy', symbol: 'AAPL' },
        { type: 'Sale', name: 'AA Plus Tradelink Ltd', count: 2, summ: '2 510', date: 'dd.mm.yyyy', symbol: 'AAPLS' },
        { type: 'Buy', name: 'Apple Inc', count: 2, summ: '2 510', date: 'dd.mm.yyyy', symbol: 'AAPLg' },
      ]

      // stocksInfo.forEach((element) => console.log(element.symbol))

      ////// // const stocksInfoWithPrice = await Promise.all(
      //   stocksInfo.map(async (item, index) => {
      //     // let apikey
      //     // if (index < 4) apikey = 'KQRHNIOUP58ZY3G3'
      //     // else if (index > 6) apikey = 'AP6O2CY6RJETBYAM'
      //     // else apikey = '6OBLQLSC72R7ZSW8'
      //     let price
      //     if (index < 4) price = await getStockPrice(item.symbol, 'KQRHNIOUP58ZY3G3')
      //     else price = await getOurStockPrice(item.symbol)
      //     console.log(price)
      //     return {
      //       ...item,
      //       price: price,
      //     }
      ////////   })
      // )
      setHistory(cockInfo)
    } catch (e) {
      console.log(e)
    }
  }

  // async function getStockPrice(symbol, apikey) {
  //   try {
  //     const response = await axios.get(
  //       `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
  //     )
  //     console.log(response.data)
  //     return response.data['Global Quote']['05. price']
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // async function getOurStockPrice(symbol) {
  //   try {
  //     const response = await axios.get(`https://gentle-sea-62964.herokuapp.com/api/stock?symbol=${symbol}`)
  //     console.log(response.data)
  //     return response.data['Global Quote']['05. price']
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  return (
    <div className="stockList">
      <div className="title">{props.title1}</div>
      <div className="list">
        <Balance balance={1000}/>
      </div>
      <div className="title">{props.title2}</div>
      <div className="container2">
        <div className="list">
          {wallet.map((history) => (
            <History history={history} key={history.symbol} />
          ))}
          </div>
      </div>
    </div>
  )
}

export default WalletList
