import { React } from 'react'
import './walletItem.css'

const WalletItem = (props) => {
  const currencyItem = props.currencyItem

  return (
    <button className="walletItem">
      <div className="walletItem__title">{currencyItem.symbol}</div>
      <div className="walletItem__balance">
        <div className="walletItem__symbol"></div>
        <div className="walletItem__sum">{currencyItem.amount}</div>
      </div>
    </button>
  )
}

export default WalletItem
