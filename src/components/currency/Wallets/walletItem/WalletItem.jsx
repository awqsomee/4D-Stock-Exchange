import { React, useState, useEffect } from 'react'
import { store } from '../../../../redux'
import './walletItem.css'

const WalletItem = (props) => {
  const currencyItem = props.currencyItem
  const [selectedCurrency, setSelectedCurrency] = useState(
    store.getState().toolkit.selectedCurrency
  )
  const isSelected = currencyItem.symbol === selectedCurrency.symbol

  useEffect(() => {
    setSelectedCurrency(store.getState().toolkit.selectedCurrency)
  }, [store])

  return (
    <button className={isSelected ? 'walletItem__push' : 'walletItem'}>
      <div className="walletItem__title">{currencyItem.symbol}</div>
      <div
        className={
          isSelected ? 'walletItem__balance__push' : 'walletItem__balance'
        }
      >
        <div className="walletItem__symbol"></div>
        <div className={'walletItem__sum'}>
          {new Intl.NumberFormat('ru-RU').format(currencyItem.amount)}
        </div>
      </div>
    </button>
  )
}

export default WalletItem
