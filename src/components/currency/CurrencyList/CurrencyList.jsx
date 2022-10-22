import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../../actions/auth'
import { exchangeCurrency, getUserCurrencies } from '../../../actions/forex'
import { store } from '../../../redux'
import { setUserCurrencies } from '../../../redux/slice'
import Wallet from '../Wallets/Wallet'

const CurrencyList = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    dispatch(getUserCurrencies()).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const fetchUserCurrencies = async () => {
    console.log('1', getUserCurrencies)
    console.log('2', getUserCurrencies())
    console.log('3', dispatch(getUserCurrencies()))
    const uC = dispatch(getUserCurrencies())
    return uC
  }

  const currencyHandler = async (dispatch, symbol, amount) => {
    await dispatch(exchangeCurrency(store.getState(setUserCurrencies).toolkit.userCurrencies, symbol, amount))
  }
  return (
    <div>
      <div>CurrencyList</div>
      {!isLoading ? (
        <div>
          {console.log('sad', store.getState(setUserCurrencies).toolkit.userCurrencies)}
          {store.getState(setUserCurrencies).toolkit.userCurrencies.map((currencyItem) => (
            <Wallet currencyItem={currencyItem} key={currencyItem.symbol} />
          ))}
        </div>
      ) : (
        <div className="app">Loading...</div>
      )}
      <button className="button balance__button" onClick={() => currencyHandler(dispatch, 'EUR', 1000)}>
        Купить валюту
      </button>
    </div>
  )
}

export default CurrencyList
