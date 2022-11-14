import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../../actions/auth'
import { exchangeCurrency, getUserCurrencies } from '../../../actions/forex'
import { store } from '../../../redux'
import WalletItem from '../Wallets/walletItem/WalletItem'
import { setSelectedCurrency } from '../../../redux/slice'
import ModalBox from '../../UI/ModalBox/ModalBox'
import NewWallet from '../Wallets/newWallet/NewWallet'
import Loader from '../../UI/loader/Loader'

const CurrencyList = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(getUserCurrencies()).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const rubCurrency = {
    _id: store.getState().toolkit.currentUser.id,
    symbol: 'RUB',
    name: 'Рубль',
    user: store.getState().toolkit.currentUser.id,
    amount: store.getState().toolkit.currentUser.balance,
    __v: 0,
  }

  const userCurrencies = useSelector((state) => state.toolkit.userCurrencies)

  return (
    <div>
      <div
        onClick={() => {
          dispatch(setSelectedCurrency(rubCurrency))
        }}
      >
        <WalletItem currencyItem={rubCurrency} />
      </div>

      {!isLoading ? (
        <div>
          {userCurrencies.map((currencyItem) => (
            <div
              onClick={() => {
                dispatch(setSelectedCurrency(currencyItem))
              }}
              key={currencyItem.symbol}
            >
              <WalletItem currencyItem={currencyItem} />
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}

      <ModalBox visible={visible} setVisible={setVisible}>
        <NewWallet sVisible={setVisible} />
      </ModalBox>

      {/*Тут захардкожено, надо делать инпуты. МодалБокс скорее всего */}
      <button
        className="button button__normal"
        style={{ fontSize: '32px' }}
        onClick={() => setVisible(true)}
      >
        +
      </button>
    </div>
  )
}

export default CurrencyList
