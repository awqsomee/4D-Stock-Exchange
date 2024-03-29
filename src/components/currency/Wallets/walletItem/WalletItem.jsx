import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../../redux'
import './walletItem.css'

const WalletItem = (props) => {
  const currencyItem = props.currencyItem
  const selectedCurrency = useSelector((state) => state.toolkit.selectedCurrency)
  const isSelected = currencyItem.symbol === selectedCurrency.symbol

  return (
    <button className={isSelected ? 'walletItem walletItem__push' : 'walletItem walletItem__normal'}>
      {currencyItem.symbol === 'RUB' ? (
        <div className="walletItem__sum">{currencyItem.amount.toFixed(2)}</div>
      ) : (
        <div className="walletItem__sum">{currencyItem.amount}</div>
      )}

      <div className={isSelected ? 'walletItem__balance__push' : 'walletItem__balance'}>
        <div className="walletItem__symbol"></div>
        <div className="walletItem__title">{currencyItem.symbol}</div>
      </div>
    </button>
  )
}

export default WalletItem
