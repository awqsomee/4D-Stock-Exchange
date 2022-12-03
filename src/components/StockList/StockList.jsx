import React, { useEffect, useMemo, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { buyStock } from '../../actions/user.js'
import { getStocksSearch } from '../../actions/stocks.js'
import Loader from '../UI/loader/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/index.js'
import { setSearch } from '../../redux/slice.jsx'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit.jsx'

const StockList = (props) => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.toolkit.stocks)
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState(false)
  const search = useSelector((state) => state.toolkit.searchQuery)
  const [elementCount, setElementCount] = useState(5)
  const [elementNumber, setElementNumber] = useState(0)
  const [modalBoxDepositTrue, setmodalBoxDepositTrue] = useState(false)
  const [modalBoxDepositFalse, setmodalBoxDepositFalse] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)
  // const [buttonText, setButtonText] = useState(0)

  // document.addEventListener('keyup', function (event) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault()
  //     // fetchData(search)
  //     console.log('Enter')
  //   }
  // })

  // const switchButtonText=(()=>{
  //   setButtonText(props.count * props)
  // })

  useEffect(() => {
    if (search.length < 2) {
      setIsStocksLoading(true)
      dispatch(setSearch(''))
      dispatch(getStocksSearch()).finally(() => {
        setIsStocksLoading(false)
      })
    } else {
      setIsStocksLoading(true)
      dispatch(getStocksSearch(search)).finally(() => {
        setIsStocksLoading(false)
      })
    }
  }, [])

  const sorting = (a, b) => {
    const value = filter
    if ((value != '') & (value === 'change')) {
      if (sort) {
        if (Number((a.prices[0].high - a.prices[1].high) / 100) > Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return 1
        }
        if (Number((a.prices[0].high - a.prices[1].high) / 100) < Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return -1
        }
        return 0
      } else {
        if (Number((a.prices[0].high - a.prices[1].high) / 100) > Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return -1
        }
        if (Number((a.prices[0].high - a.prices[1].high) / 100) < Number((b.prices[0].high - b.prices[1].high) / 100)) {
          return 1
        }
        return 0
      }
    } else if ((value != '') & (value === 'name')) {
      if (sort) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        return 0
      } else {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1
        }
        return 0
      }
    }
  }
  const sortedStocks = useMemo(() => {
    return [...stocks].sort(sorting)
  }, [filter, sort, stocks])

  // Специализированный Фонд Приватизации „Чековый инвестиционный фонд аграрно­-промышленного комплекса Республики Татарстан „Золотой Колос“
  // WWWWW
  // 531.43%
  // 136800.59

  return (
    <div className="stockList">
      <ModalBoxDeposit className="err" visible={modalBoxDepositFalse} setVisible={setmodalBoxDepositFalse}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className="ok" visible={modalBoxDepositTrue} setVisible={setmodalBoxDepositTrue}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <div className="container2">
        <div className="title">{props.title}</div>
        <div className="list">
          <Sorting setFilter={setFilter} setSort={setSort} />
          <Panel className="panel" />

          {isStocksLoading ? (
            <Loader />
          ) : (
            <>
              {sortedStocks.length > 0 ? (
                sortedStocks.map((stock) => (
                  <Stock
                    stock={stock}
                    function={buyStock}
                    key={stock.isin}
                    buttonText="Купить"
                    modalBoxDepositFalse={modalBoxDepositFalse}
                    modalBoxDepositTrue={modalBoxDepositTrue}
                    setmodalBoxDepositFalse={setmodalBoxDepositFalse}
                    setmodalBoxDepositTrue={setmodalBoxDepositTrue}
                  />
                ))
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 40,
                  }}
                >
                  Акции не найдены
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default StockList
