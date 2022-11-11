import { React, useEffect, useState } from 'react'
import TransactionItem from '../transactionItem/TransactionItem'
import { store } from '../../../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { exchangeCurrency, getUserCurrencies } from '../../../../actions/forex'
import { getTransactions } from '../../../../actions/transactions'
import { changeBalance } from '../../../../actions/balance'
import './transactions.css'
import CloseWallet from '../../Wallets/closeWallet/CloseWallet'
import ModalBox from '../../../UI/ModalBox/ModalBox'

const Transactions = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isReplenishing, setIsReplenishing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [value, setValue] = useState('')
  const [transactions, setTransactions] = useState()
  const [visible, setVisible] = useState(false)
  const selectedCurrency = useSelector((state) => state.toolkit.selectedCurrency)

  useEffect(() => {
    setIsLoading(true)
    fetchData()
      .then((data) => setTransactions(data))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const fetchData = () => {
    dispatch(getUserCurrencies())
    const data = getTransactions()
    return data
  }

  const replenishHandler = async (dispatch, value, setValue) => {
    setIsReplenishing(true)

    // One LEG!!!
    if (selectedCurrency?.symbol === 'RUB') await dispatch(changeBalance(value))
    else await dispatch(exchangeCurrency(selectedCurrency?.symbol, value))
    setValue('')
    setIsReplenishing(false)
  }

  const withdrawHandler = async (dispatch, value, setValue) => {
    setIsWithdrawing(true)
    if (selectedCurrency?.symbol === 'RUB') await dispatch(changeBalance(-value))
    else await dispatch(exchangeCurrency(selectedCurrency?.symbol, -value))
    setValue('')
    setIsWithdrawing(false)
  }

  const changeHandler = (value, setValue) => {
    setValue(value.replaceAll(/\D/g, ''))
  }

  return (
    <div className="transactions">
      <ModalBox visible={visible} setVisible={setVisible}>
        <CloseWallet symbol={selectedCurrency?.symbol} sVisible={setVisible} />
      </ModalBox>
      <div className="transactions__info">
        <div className="transactions__head">
          <div className="transactions__summ">
            {selectedCurrency.amount ? (
              <div className="transactions__number">
                {new Intl.NumberFormat('ru-RU').format(selectedCurrency?.amount)}
              </div>
            ) : (
              <></>
            )}
            <div className="transactions__symbol">{selectedCurrency?.symbol}</div>
          </div>
          <div className="transactions__delete" onClick={() => setVisible(true)}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.4166 5.20833H14.5833C14.5833 4.6558 14.3638 4.12589 13.9731 3.73519C13.5824 3.34449 13.0525 3.125 12.4999 3.125C11.9474 3.125 11.4175 3.34449 11.0268 3.73519C10.6361 4.12589 10.4166 4.6558 10.4166 5.20833V5.20833ZM8.85409 5.20833C8.85409 4.72956 8.94839 4.25547 9.13161 3.81313C9.31483 3.3708 9.58338 2.96889 9.92193 2.63034C10.2605 2.29179 10.6624 2.02324 11.1047 1.84002C11.5471 1.6568 12.0211 1.5625 12.4999 1.5625C12.9787 1.5625 13.4528 1.6568 13.8951 1.84002C14.3375 2.02324 14.7394 2.29179 15.0779 2.63034C15.4165 2.96889 15.685 3.3708 15.8682 3.81313C16.0515 4.25547 16.1458 4.72956 16.1458 5.20833H22.1353C22.3425 5.20833 22.5413 5.29064 22.6878 5.43716C22.8343 5.58367 22.9166 5.78238 22.9166 5.98958C22.9166 6.19678 22.8343 6.3955 22.6878 6.54201C22.5413 6.68852 22.3425 6.77083 22.1353 6.77083H20.7603L19.5416 19.3865C19.4481 20.3531 18.9979 21.2503 18.2788 21.9029C17.5596 22.5556 16.6232 22.917 15.652 22.9167H9.34784C8.37686 22.9168 7.44065 22.5553 6.72174 21.9026C6.00283 21.2499 5.55277 20.3529 5.45929 19.3865L4.2395 6.77083H2.8645C2.6573 6.77083 2.45859 6.68852 2.31207 6.54201C2.16556 6.3955 2.08325 6.19678 2.08325 5.98958C2.08325 5.78238 2.16556 5.58367 2.31207 5.43716C2.45859 5.29064 2.6573 5.20833 2.8645 5.20833H8.85409ZM10.9374 10.1562C10.9374 9.94905 10.8551 9.75034 10.7086 9.60382C10.5621 9.45731 10.3634 9.375 10.1562 9.375C9.94897 9.375 9.75026 9.45731 9.60374 9.60382C9.45723 9.75034 9.37492 9.94905 9.37492 10.1562V17.9687C9.37492 18.1759 9.45723 18.3747 9.60374 18.5212C9.75026 18.6677 9.94897 18.75 10.1562 18.75C10.3634 18.75 10.5621 18.6677 10.7086 18.5212C10.8551 18.3747 10.9374 18.1759 10.9374 17.9687V10.1562ZM14.8437 9.375C15.0509 9.375 15.2496 9.45731 15.3961 9.60382C15.5426 9.75034 15.6249 9.94905 15.6249 10.1562V17.9687C15.6249 18.1759 15.5426 18.3747 15.3961 18.5212C15.2496 18.6677 15.0509 18.75 14.8437 18.75C14.6365 18.75 14.4378 18.6677 14.2912 18.5212C14.1447 18.3747 14.0624 18.1759 14.0624 17.9687V10.1562C14.0624 9.94905 14.1447 9.75034 14.2912 9.60382C14.4378 9.45731 14.6365 9.375 14.8437 9.375ZM7.0145 19.2365C7.07069 19.8163 7.3408 20.3544 7.77218 20.7459C8.20356 21.1375 8.76528 21.3543 9.34784 21.3542H15.652C16.2346 21.3543 16.7963 21.1375 17.2277 20.7459C17.659 20.3544 17.9292 19.8163 17.9853 19.2365L19.1916 6.77083H5.80825L7.0145 19.2365Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className="transactions__actions">
          <input
            className="transactions__input"
            onChange={(event) => {
              event.stopPropagation()
              changeHandler(event.target.value, setValue)
            }}
            value={value}
            placeholder={'Сумма'}
          ></input>
          <button className="button button__normal" onClick={() => replenishHandler(dispatch, value, setValue)}>
            {isReplenishing ? 'Loading...' : 'Пополнить'}
          </button>
          <button className="button button__normal" onClick={() => withdrawHandler(dispatch, value, setValue)}>
            {isWithdrawing ? 'Loading...' : 'Вывести'}
          </button>
        </div>
      </div>
      <div className="transactions__history">
        <div>История изменений</div>
        {!isLoading ? (
          <div className="transactions__list">
            {transactions
              .filter((transaction) => {
                return transaction.currency === selectedCurrency.symbol
              })
              .map((transactionItem) => (
                <TransactionItem transactionItem={transactionItem} key={transactionItem._id} />
              ))}
          </div>
        ) : (
          <div className="app">Loading...</div>
        )}
      </div>
    </div>
  )
}

export default Transactions
