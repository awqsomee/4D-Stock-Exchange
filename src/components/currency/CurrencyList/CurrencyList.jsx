import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../../actions/auth'
import { exchangeCurrency, getUserCurrencies } from '../../../actions/forex'
import { store } from '../../../redux'
import WalletItem from '../Wallets/walletItem/WalletItem'
import { setSelectedCurrency } from '../../../redux/slice'

const CurrencyList = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    dispatch(getUserCurrencies()).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const currencyHandler = async (dispatch, symbol, amount) => {
    await dispatch(
      exchangeCurrency(store.getState().toolkit.userCurrencies, symbol, amount)
    )
  }

  return (
    <div>
      {!isLoading ? (
        <div>
          {store.getState().toolkit.userCurrencies.map((currencyItem) => (
            <WalletItem
              currencyItem={currencyItem}
              key={currencyItem.symbol}
              onClick={() => {
                dispatch(setSelectedCurrency(currencyItem))
              }}
            />
          ))}
        </div>
      ) : (
        <div className="app">Loading...</div>
      )}
      {/*Тут захардкожено, надо делать инпуты. МодалБокс скорее всего */}
      <button
        className="button balance__button"
        onClick={() => currencyHandler(dispatch, 'EUR', 1000)}
      >
        +
      </button>
    </div>
  )
}

export default CurrencyList
