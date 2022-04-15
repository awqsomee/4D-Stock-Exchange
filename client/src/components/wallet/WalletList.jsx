import React, { useEffect, useState } from 'react'
import History from '../history/History'
import Balance from '../balance/Balance'

const WalletList = (props) => {
  const [wallet, setHistory] = useState([])

  useEffect(() => {
    getHistory()
  }, [])

  let GET_POSTS_LINK
  GET_POSTS_LINK = `https://gentle-sea-62964.herokuapp.com/api/`

  async function getHistory() {
    try {
      const cockInfo = [
        { type: 'Sale', name: 'Apple Inc', count: 2, summ: '2 510', date: 'dd.mm.yyyy', symbol: 'AAPL' },
        { type: 'Sale', name: 'AA Plus Tradelink Ltd', count: 2, summ: '2 510', date: 'dd.mm.yyyy', symbol: 'AAPLS' },
        { type: 'Buy', name: 'Apple Inc', count: 2, summ: '2 510', date: 'dd.mm.yyyy', symbol: 'AAPLG' },
      ]
      setHistory(cockInfo)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="stockList">
      <div className="title">{props.title1}</div>
      <div className="list">
        <Balance />
        <Balance />
      </div>
      <div className="list"></div>
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
