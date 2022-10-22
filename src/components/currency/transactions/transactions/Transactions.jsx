import { React, useEffect, useState } from 'react'
import TransactionItem from '../transactionItem/TransactionItem'
import { store } from '../../../../redux'
import { useDispatch } from 'react-redux'
import { getUserCurrencies } from '../../../../actions/forex'
import './transactions.css'

const Transactions = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    dispatch(getUserCurrencies()).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const selectedCurrency = store.getState().toolkit.selectedCurrency

  console.log('sel', selectedCurrency)
  return (
    <div className="transactions">
      <div className="transactions__actions">
        <div className="transactions__summ">
          <div className="transactions__number">{selectedCurrency.amount}</div>
          <div className="transactions__symbol">{selectedCurrency.symbol}</div>
        </div>
        <div className="transactions__actions">
          <input></input>
          <button className="button button__normal">Пополнить</button>
          <button className="button button__normal">Вывести</button>
        </div>
      </div>
      <div className="transactions__history">
        <div>История изменений</div>
        <div className="transactions__list">
          <TransactionItem />
        </div>
      </div>
    </div>
  )
}

export default Transactions
