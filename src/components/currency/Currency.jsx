import React from 'react'
import Balance from './balance/Balance'
import './сurrency.css'
// import { getTransactions } from '../../actions/transactions'

const Currency = () => {
  // const [transactions, setTransactions] = useState([])

  // useEffect(() => {
  //   getTransactions().then((data) => setTransactions(data))
  // }, [])

  return (
    <div className="list">
      <div className="title">Валюта</div>
      <Balance />
      <div>
        {/* <CurrencyList />
        <CurrencyItem /> */}
      </div>
      {/* <div className="list">
        <Balance btnText="Пополнить (₽)" type={'Deposit'} />
        <Balance btnText="Снять (₽)" type={'Withdraw'} />
        <Convert btnText="Обменять" type={'Convert'} />
      </div> */}

      {/* <div className="title">История изменений</div>
      <div className="container2">
        <div className="list">
          {transactions.map((history) => (
            <History history={history} key={history['_id']} />
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default Currency
