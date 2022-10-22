import React from 'react'
import '../Wallets/wallet.css'

const Wallet = () => {
  return (
    <div>
      <button className="walletItem">
        <div className="walletItem__title">EUR</div>
        <div className="walletItem__balance">
          <div className="walletItem__symbol">€</div>
          <div className="walletItem__sum">1000</div>
        </div>
      </button>
      <button>hhhhhhhhhhhhhhh</button>
    </div>
  )
}

export default Wallet
