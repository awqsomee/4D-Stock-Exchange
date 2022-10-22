import React from 'react'
import Balance from './balance/Balance'
import './сurrency.css'
import Wallet from './Wallets/Wallet'
// import { getTransactions } from '../../actions/transactions'

const Currency = (props) => {
  // const [transactions, setTransactions] = useState([])

  // useEffect(() => {
  //   getTransactions().then((data) => setTransactions(data))
  // }, [])

  return (
    <div className="currency">
      <div className="container2">
        <div className="title">{props.title}</div>
        <div ckassName="wallet">
          <Wallet></Wallet>
        </div>
        {/* <div className="convert"><Balance /></div> */}
      </div>
    </div>
  )
}

export default Currency
