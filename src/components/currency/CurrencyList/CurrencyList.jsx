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
  const rubCurrency = {
    _id: store.getState().toolkit.currentUser.id,
    symbol: 'RUB',
    name: 'Рубль',
    user: store.getState().toolkit.currentUser.id,
    amount: store.getState().toolkit.currentUser.balance,
    __v: 0,
  }
  return (
    <div>
      <WalletItem currencyItem={rubCurrency} />
      {!isLoading ? (
        <div>
          {store.getState().toolkit.userCurrencies.map((currencyItem) => (
            <div
              onClick={() => {
                dispatch(setSelectedCurrency(currencyItem))
                console.log('33', currencyItem)
              }}
            >
              <WalletItem
                currencyItem={currencyItem}
                key={currencyItem.symbol}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="app">Loading...</div>
      )}
      {/*Тут захардкожено, надо делать инпуты. МодалБокс скорее всего */}
      <button
        className="button button__normal"
        onClick={() => currencyHandler(dispatch, 'EUR', 1000)}
      >
        +
      </button>
    </div>
  )
}

export default CurrencyList
