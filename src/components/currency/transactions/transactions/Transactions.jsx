import { React, useEffect, useMemo, useState } from 'react'
import TransactionItem from '../transactionItem/TransactionItem'
import { store } from '../../../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { exchangeCurrency, getUserCurrencies } from '../../../../actions/forex'
import { getTransactions } from '../../../../actions/transactions'
import { changeBalance } from '../../../../actions/balance'
import './transactions.css'
import CloseWallet from '../../Wallets/closeWallet/CloseWallet'
import ModalBox from '../../../UI/ModalBox/ModalBox'
import InputNumber from '../../../UI/input/InputNumber'
import Loader from '../../../UI/loader/Loader'
import TransactionsPanel from './TransactionsPanel'
import ButtonLoader from '../../../UI/loader/ButtonLoader'

const Transactions = (props) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isReplenishing, setIsReplenishing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [value, setValue] = useState('')
  const transactions = useSelector((state) => state.toolkit.transactions)
  const userCurrencies = useSelector((state) => state.toolkit.userCurrencies)
  const [visible, setVisible] = useState(false)
  const [sortImg, setSortImg] = useState('decreaseSort')
  const [filter, setFilter] = useState('date')
  const [sort, setSort] = useState(false)
  const [ceiling, setCeiling] = useState(10)
  const [transactionAmount, setTransactionAmount] = useState(0)
  const count = 10
  useEffect(() => {
    setIsLoading(true)
    fetchData().finally(() => {
      setIsLoading(false)
    })
  }, [])

  const fetchData = async () => {
    await Promise.all([dispatch(getTransactions())])
  }

  const replenishHandler = async (dispatch, value, setValue) => {
    setIsReplenishing(true)

    // One LEG!!!
    if (selectedCurrency?.symbol === 'RUB') {
      await dispatch(changeBalance(transactions, value))
      props.setmodalBoxDeposit(true)
    } else {
      await dispatch(exchangeCurrency(selectedCurrency?.symbol, userCurrencies, transactions, value))
      props.setmodalBoxDeposit(true)
    }
    setValue('')
    setIsReplenishing(false)
  }

  const withdrawHandler = async (dispatch, value, setValue) => {
    setIsWithdrawing(true)
    if (selectedCurrency?.symbol === 'RUB') {
      await dispatch(changeBalance(transactions, -value))
      props.setmodalBoxDeposit(true)
    } else {
      await dispatch(exchangeCurrency(selectedCurrency?.symbol, userCurrencies, transactions, -value))
      props.setmodalBoxDeposit(true)
    }
    setValue('')
    setIsWithdrawing(false)
  }

  const withdrawAll = async (dispatch) => {
    await dispatch(changeBalance(transactions, -selectedCurrency.amount))
    props.setmodalBoxDeposit(true)
  }

  const selectedCurrency = useSelector((state) => state.toolkit.selectedCurrency)

  const sorting = (a, b) => {
    const value = filter
    if ((value != '') & (value != 'Обмен валюты' || value != 'Пополнение баланса' || value != 'Вывод средств')) {
      if (a[value] == null)
        if (sort) {
          if (0 > b[value]) {
            return 1
          }
          if (0 < b[value]) {
            return -1
          }
          return 0
        } else {
          if (0 > b[value]) {
            return -1
          }
          if (0 < b[value]) {
            return 1
          }
          return 0
        }
      if (b[value] == null)
        if (sort) {
          if (a[value] > 0) {
            return 1
          }
          if (a[value] < 0) {
            return -1
          }
          return 0
        } else {
          if (a[value] > 0) {
            return -1
          }
          if (a[value] < 0) {
            return 1
          }
          return 0
        }
      if (sort) {
        if (a[value] > b[value]) {
          return 1
        }
        if (a[value] < b[value]) {
          return -1
        }
        return 0
      } else {
        if (a[value] > b[value]) {
          return -1
        }
        if (a[value] < b[value]) {
          return 1
        }
        return 0
      }
    }
  }

  const showMore = () => {
    setCeiling(ceiling + count)
  }

  const sortedTransactions = useMemo(() => {
    return [...transactions]
      ?.filter((transaction) => {
        return transaction?.symbol === selectedCurrency?.symbol || transaction?.currency === selectedCurrency?.symbol
      })
      .filter((transactionItem) => {
        if (
          (filter != '') &
          (filter === 'Обмен акций' ||
            filter === 'Обмен валюты' ||
            filter === 'Пополнение баланса' ||
            filter === 'Вывод средств')
        )
          return transactionItem.type === filter
        else return transactionItem
      })
      .sort(sorting)
  }, [filter, sort, transactions, selectedCurrency])

  return (
    <div className="transactions">
      <ModalBox visible={visible} setVisible={setVisible}>
        <CloseWallet
          symbol={selectedCurrency?.symbol}
          sVisible={setVisible}
          setmodalBoxDeposit={props.setmodalBoxDeposit}
        />
      </ModalBox>

      <div className="transactions__info">
        <div className="transactions__head">
          <div className="transactions__summ">
            {selectedCurrency.symbol === 'RUB' ? (
              <div>{selectedCurrency?.amount.toFixed(2) + ' ' + selectedCurrency?.symbol}</div>
            ) : (
              <div>{selectedCurrency?.amount + ' ' + selectedCurrency?.symbol}</div>
            )}
          </div>

          {selectedCurrency?.symbol != 'RUB' ? (
            <div className="transactions__difference">
              <div className="transactions__last_price">
                <div>Прежняя цена</div>
                <div className="transactions__last_price__price">{selectedCurrency?.latestPrice.toFixed(2)}</div>
              </div>
              <div className="transactions__difference_amount">
                <div>Изменение</div>
                {selectedCurrency?.difference >= 0 ? (
                  <div className="transactions__difference_amount__amount_inc">
                    <div>+</div>
                    <div>{selectedCurrency?.difference.toFixed(2)}</div>
                  </div>
                ) : (
                  <div className="transactions__difference_amount__amount_dec">
                    <div>{selectedCurrency?.difference.toFixed(2)}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="transactions__difference"></div>
          )}

          {selectedCurrency?.symbol != 'RUB' ? (
            <div className="transactions__delete" onClick={() => setVisible(true)}>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.4166 5.20833H14.5833C14.5833 4.6558 14.3638 4.12589 13.9731 3.73519C13.5824 3.34449 13.0525 3.125 12.4999 3.125C11.9474 3.125 11.4175 3.34449 11.0268 3.73519C10.6361 4.12589 10.4166 4.6558 10.4166 5.20833V5.20833ZM8.85409 5.20833C8.85409 4.72956 8.94839 4.25547 9.13161 3.81313C9.31483 3.3708 9.58338 2.96889 9.92193 2.63034C10.2605 2.29179 10.6624 2.02324 11.1047 1.84002C11.5471 1.6568 12.0211 1.5625 12.4999 1.5625C12.9787 1.5625 13.4528 1.6568 13.8951 1.84002C14.3375 2.02324 14.7394 2.29179 15.0779 2.63034C15.4165 2.96889 15.685 3.3708 15.8682 3.81313C16.0515 4.25547 16.1458 4.72956 16.1458 5.20833H22.1353C22.3425 5.20833 22.5413 5.29064 22.6878 5.43716C22.8343 5.58367 22.9166 5.78238 22.9166 5.98958C22.9166 6.19678 22.8343 6.3955 22.6878 6.54201C22.5413 6.68852 22.3425 6.77083 22.1353 6.77083H20.7603L19.5416 19.3865C19.4481 20.3531 18.9979 21.2503 18.2788 21.9029C17.5596 22.5556 16.6232 22.917 15.652 22.9167H9.34784C8.37686 22.9168 7.44065 22.5553 6.72174 21.9026C6.00283 21.2499 5.55277 20.3529 5.45929 19.3865L4.2395 6.77083H2.8645C2.6573 6.77083 2.45859 6.68852 2.31207 6.54201C2.16556 6.3955 2.08325 6.19678 2.08325 5.98958C2.08325 5.78238 2.16556 5.58367 2.31207 5.43716C2.45859 5.29064 2.6573 5.20833 2.8645 5.20833H8.85409ZM10.9374 10.1562C10.9374 9.94905 10.8551 9.75034 10.7086 9.60382C10.5621 9.45731 10.3634 9.375 10.1562 9.375C9.94897 9.375 9.75026 9.45731 9.60374 9.60382C9.45723 9.75034 9.37492 9.94905 9.37492 10.1562V17.9687C9.37492 18.1759 9.45723 18.3747 9.60374 18.5212C9.75026 18.6677 9.94897 18.75 10.1562 18.75C10.3634 18.75 10.5621 18.6677 10.7086 18.5212C10.8551 18.3747 10.9374 18.1759 10.9374 17.9687V10.1562ZM14.8437 9.375C15.0509 9.375 15.2496 9.45731 15.3961 9.60382C15.5426 9.75034 15.6249 9.94905 15.6249 10.1562V17.9687C15.6249 18.1759 15.5426 18.3747 15.3961 18.5212C15.2496 18.6677 15.0509 18.75 14.8437 18.75C14.6365 18.75 14.4378 18.6677 14.2912 18.5212C14.1447 18.3747 14.0624 18.1759 14.0624 17.9687V10.1562C14.0624 9.94905 14.1447 9.75034 14.2912 9.60382C14.4378 9.45731 14.6365 9.375 14.8437 9.375ZM7.0145 19.2365C7.07069 19.8163 7.3408 20.3544 7.77218 20.7459C8.20356 21.1375 8.76528 21.3543 9.34784 21.3542H15.652C16.2346 21.3543 16.7963 21.1375 17.2277 20.7459C17.659 20.3544 17.9292 19.8163 17.9853 19.2365L19.1916 6.77083H5.80825L7.0145 19.2365Z"
                  fill="white"
                />
              </svg>
            </div>
          ) : (
            <div className="transactions__delete" onClick={() => withdrawAll(dispatch)}>
              x
            </div>
          )}
        </div>

        <div className="transactions__actions">
          <InputNumber className="number_input" value={value} setValue={setValue} placeholder="Сумма"></InputNumber>
          <button className="button button__normal" onClick={() => replenishHandler(dispatch, value, setValue)}>
            {selectedCurrency.symbol === 'RUB' ? (
              isReplenishing ? (
                <ButtonLoader />
              ) : (
                'Пополнить'
              )
            ) : isReplenishing ? (
              <ButtonLoader />
            ) : (
              'Купить'
            )}
          </button>
          <button
            className="button button__normal"
            onClick={() => {
              withdrawHandler(dispatch, value, setValue)
            }}
          >
            {selectedCurrency.symbol === 'RUB' ? (
              isWithdrawing ? (
                <ButtonLoader />
              ) : (
                'Вывести'
              )
            ) : isWithdrawing ? (
              <ButtonLoader />
            ) : (
              'Продать'
            )}
          </button>
        </div>
        {value && selectedCurrency.symbol !== 'RUB' ? (
          <div className="transactions__history" style={{ marginTop: '20px' }}>
            {selectedCurrency.price
              ? ` = ${(value * selectedCurrency.price).toFixed(2)} RUB`
              : ` = ${(value * selectedCurrency.latestPrice).toFixed(2)} RUB`}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="transactions__history">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>История изменений</div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
            <div
              className="showMore"
              style={{
                display: 'flex',
                marginTop: '0',
                opacity: '0.5',
                alignSelf: 'center',
              }}
              onClick={() => {
                setFilter('date')
              }}
            >
              Сбросить фильтры
            </div>

            <svg
              className={`${sortImg} sorting__img`}
              onClick={() => {
                if (sortImg == 'decreaseSort') {
                  setSortImg('increaseSort')
                  setSort(true)
                } else {
                  setSortImg('decreaseSort')
                  setSort(false)
                }
              }}
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.76252 22.275C7.65002 22.3875 7.53752 22.5 7.31252 22.5C7.08752 22.5 6.97502 22.3875 6.86252 22.275L3.60002 19.0125C3.37502 18.7875 3.37502 18.45 3.60002 18.225C3.82502 18 4.16252 18 4.38752 18.225L6.75002 20.5875V5.0625C6.75002 4.725 6.97502 4.5 7.31252 4.5C7.65002 4.5 7.87502 4.725 7.87502 5.0625V20.5875L10.2375 18.225C10.4625 18 10.8 18 11.025 18.225C11.25 18.45 11.25 18.7875 11.025 19.0125L7.76252 22.275ZM14.0625 6.75C13.725 6.75 13.5 6.525 13.5 6.1875C13.5 5.85 13.725 5.625 14.0625 5.625H23.0625C23.4 5.625 23.625 5.85 23.625 6.1875C23.625 6.525 23.4 6.75 23.0625 6.75H14.0625ZM14.0625 11.25C13.725 11.25 13.5 11.025 13.5 10.6875C13.5 10.35 13.725 10.125 14.0625 10.125H20.8125C21.15 10.125 21.375 10.35 21.375 10.6875C21.375 11.025 21.15 11.25 20.8125 11.25H14.0625ZM14.0625 15.75C13.725 15.75 13.5 15.525 13.5 15.1875C13.5 14.85 13.725 14.625 14.0625 14.625H18.5625C18.9 14.625 19.125 14.85 19.125 15.1875C19.125 15.525 18.9 15.75 18.5625 15.75H14.0625ZM14.0625 20.25C13.725 20.25 13.5 20.025 13.5 19.6875C13.5 19.35 13.725 19.125 14.0625 19.125H16.3125C16.65 19.125 16.875 19.35 16.875 19.6875C16.875 20.025 16.65 20.25 16.3125 20.25H14.0625Z"
                fill="#394249"
                stroke="#394249"
                strokeMiterlimit="10"
              />
            </svg>
          </div>
        </div>

        <TransactionsPanel filter={filter} setFilter={setFilter}></TransactionsPanel>

        {!isLoading ? (
          <div className="transactions__list">
            {sortedTransactions.map((el, index) => {
              if (index < ceiling) return <TransactionItem transactionItem={el} key={el._id} />
            })}
            {sortedTransactions.length > ceiling ? (
              <div className="showMore" onClick={() => showMore()}>
                Показать больше
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Transactions
