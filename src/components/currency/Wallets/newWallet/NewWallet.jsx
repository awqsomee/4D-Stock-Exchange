import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCurrencies, openCurrencyAccount } from '../../../../actions/forex'
import { store } from '../../../../redux'
import { setUserCurrencies } from '../../../../redux/slice'
import ModalBoxDeposit from '../../../UI/ModalBox/ModalBoxDeposit'

const NewWallet = (props) => {
  const [currency, setCurrency] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const allCurrencies = useSelector((state) => state.toolkit.currecncies)
  const userCurrencies = useSelector((state) => state.toolkit.userCurrencies)
  const currecncies = Object.keys(allCurrencies)

  // const timerTrue = useTimeout(props.setmodalBoxDepositTrue(false), 500)
  // const timerFalse = useTimeout(props.setmodalBoxDepositFalse(false), 500)
  useEffect(() => {
    setIsLoading(true)
    dispatch(getAllCurrencies()).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const CreateWallet = async (currency) => {
    setIsLoading(true)
    await dispatch(openCurrencyAccount(userCurrencies, currency))
    setCurrency('')
    // if (store.getState(setUserCurrencies).toolkit.userCurrencies.includes(currency)) {
    //   props.sVisible(false)
    //   props.setmodalBoxDepositTrue(true)
    // } else {
    //   props.sVisible(false)
    //   props.setmodalBoxDepositFalse(true)
    // }
    setIsLoading(false)
  }

  return (
    <div>
      <div className="close_img" onClick={() => props.sVisible(false)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.99032 3.99018C4.79139 3.99023 4.59699 4.04961 4.43198 4.16073C4.26697 4.27184 4.13884 4.42964 4.06399 4.61395C3.98913 4.79826 3.97094 5.00071 4.01175 5.19542C4.05255 5.39012 4.15049 5.56823 4.29305 5.70698L10.586 11.9999L4.29305 18.2929C4.19708 18.3851 4.12046 18.4954 4.06767 18.6176C4.01489 18.7397 3.987 18.8711 3.98565 19.0042C3.98429 19.1372 4.0095 19.2692 4.05979 19.3924C4.11008 19.5155 4.18444 19.6274 4.27852 19.7215C4.3726 19.8156 4.4845 19.89 4.60768 19.9402C4.73086 19.9905 4.86283 20.0157 4.99587 20.0144C5.12891 20.013 5.26034 19.9851 5.38247 19.9324C5.5046 19.8796 5.61497 19.803 5.70712 19.707L12.0001 13.414L18.2931 19.707C18.3852 19.803 18.4956 19.8796 18.6177 19.9324C18.7398 19.9851 18.8713 20.013 19.0043 20.0144C19.1373 20.0157 19.2693 19.9905 19.3925 19.9402C19.5157 19.89 19.6276 19.8156 19.7217 19.7215C19.8157 19.6274 19.8901 19.5155 19.9404 19.3924C19.9907 19.2692 20.0159 19.1372 20.0145 19.0042C20.0132 18.8711 19.9853 18.7397 19.9325 18.6176C19.8797 18.4954 19.8031 18.3851 19.7071 18.2929L13.4141 11.9999L19.7071 5.70698C19.8516 5.56652 19.9503 5.38567 19.9903 5.18815C20.0302 4.99063 20.0096 4.78565 19.931 4.60007C19.8525 4.41448 19.7197 4.25695 19.5501 4.14812C19.3805 4.03929 19.182 3.98424 18.9806 3.99018C18.7208 3.99792 18.4742 4.1065 18.2931 4.29292L12.0001 10.5859L5.70712 4.29292C5.61393 4.19712 5.50248 4.12098 5.37937 4.06898C5.25625 4.01698 5.12396 3.99019 4.99032 3.99018Z"
            fill="white"
          />
        </svg>
      </div>
      <div>
        <div className="login__header">Открытие кошелька</div>
        <select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value)
          }}
        >
          <option value={''}>Выберите валюту</option>
          {currecncies.map((currency) => (
            <option key={currency.name} value={currency}>
              {allCurrencies[currency].name}
            </option>
          ))}
        </select>

        <button
          disabled={currency === ''}
          className={currency === '' ? 'button__disable' : 'button button__normal'}
          onClick={() => {
            CreateWallet(currency)
            if (CreateWallet) {
              props.sVisible(false)
              props.setmodalBoxDepositTrue(true)
            } else {
              props.setmodalBoxDepositFalse(true)
            }
          }}
        >
          Создать кошелек
        </button>
      </div>
    </div>
  )
}

export default NewWallet
