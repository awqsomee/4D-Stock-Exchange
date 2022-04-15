import React, { useEffect, useState } from 'react'
import History from '../history/History'
import Balance from '../balance/Balance'
import axios from 'axios'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'

const WalletList = (props) => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => getTransactions(), [])

  const getTransactions = async () => {
    try {
      const responce = await axios.get(`${serverAddress}/api/auth/transactions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      responce.data.transactions.reverse()
      setTransactions(responce.data.transactions)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="stockList">
      <div className="title">{props.title1}</div>
      <div className="list">
        <Balance btnText="Пополнить" type={'Deposit'} />
        <Balance btnText="Снять" type={'Withdraw'} />
      </div>
      <div className="list"></div>
      <div className="title">{props.title2}</div>
      <div className="container2">
        <div className="list">
          {transactions.map((history) => (
            <History history={history} key={history.symbol} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletList
