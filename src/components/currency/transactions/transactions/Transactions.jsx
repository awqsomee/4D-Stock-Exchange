import { React, useEffect, useState } from 'react'
import TransactionItem from '../transactionItem/TransactionItem'
import { store } from '../../../../redux'
import { useDispatch } from 'react-redux'
import { exchangeCurrency, getUserCurrencies } from '../../../../actions/forex'
import { getTransactions } from '../../../../actions/transactions'
import { changeBalance } from '../../../../actions/balance'
import './transactions.css'

const Transactions = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState('')
  const [transactions, setTransactions] = useState()

  // TODO: сделать одновременную асинхронную загрузку
  useEffect(() => {
    setIsLoading(true)
    dispatch(getUserCurrencies())
      .then(() => {
        getTransactions()
      })
      .then((data) => {
        console.log(data)
        setTransactions(data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const replenishHandler = async (dispatch, value, setValue) => {
    await dispatch(changeBalance(value))
    setValue(0)
  }

  const withdrawHandler = async (dispatch, value, setValue) => {
    await dispatch(changeBalance(-value))
    setValue(0)
  }

  const changeHandler = (value, setValue) => {
    setValue(value.replace(/\D/, ''))
  }

  const selectedCurrency = store.getState().toolkit.selectedCurrency

  console.log('sel', selectedCurrency)
  return (
    <div className="transactions">
      <div className="transactions__actions">
        <div className="transactions__summ">
          <div className="transactions__number">
            {new Intl.NumberFormat('ru-RU').format(selectedCurrency.amount)}
          </div>
          <div className="transactions__symbol">{selectedCurrency.symbol}</div>
        </div>
        <div className="transactions__actions">
          <input
            onChange={(event) => changeHandler(event.target.value, setValue)}
            value={value}
            placeholder={'Сумма'}
          ></input>
          <button
            className="button button__normal"
            onClick={() => replenishHandler(dispatch, value, setValue)}
          >
            Пополнить
          </button>
          <button
            className="button button__normal"
            onClick={() => withdrawHandler(dispatch, value, setValue)}
          >
            Вывести
          </button>
        </div>
      </div>
      <div className="transactions__history">
        <div>История изменений</div>
        {!isLoading ? (
          <div className="transactions__list">
            {console.log('tr', transactions)}
            {transactions
              .filter((transaction) => {
                return transaction.currency === selectedCurrency.symbol
              })
              .map((transactionItem) => (
                <TransactionItem
                  transactionItem={transactionItem}
                  key={transactionItem._id}
                />
              ))}
          </div>
        ) : (
          <div className="app">Loading...</div>
        )}
      </div>
    </div>
  )
}

export default Transactions
