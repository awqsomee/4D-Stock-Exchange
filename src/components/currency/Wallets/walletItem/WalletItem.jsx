import { React } from 'react'
import { store } from '../../../../redux'
import './walletItem.css'

const WalletItem = (props) => {
  const currencyItem = props.currencyItem
  const selectedCurrency = store.getState().toolkit.selectedCurrency

  console.log('selectedC', selectedCurrency)

  return (
    <button
      className={
        currencyItem === selectedCurrency ? 'walletItem__push' : 'walletItem'
      }
    >
      <div className="walletItem__title">{currencyItem.symbol}</div>
      <div
        className={
          currencyItem === selectedCurrency
            ? 'walletItem__balance__push'
            : 'walletItem__balance'
        }
      >
        <div className="walletItem__symbol"></div>
        <div className={'walletItem__sum'}>{currencyItem.amount}</div>
      </div>
    </button>
  )
}

export default WalletItem
