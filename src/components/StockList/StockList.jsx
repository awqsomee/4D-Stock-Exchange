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
import { setIsSearching, setSearch } from '../../redux/slice.jsx'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit.jsx'

const StockList = (props) => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.toolkit.stocks)
  const isSearching = useSelector((state) => state.toolkit.isSearching)
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState(false)
  const search = useSelector((state) => state.toolkit.searchQuery)
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
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
    document.title = 'STONKS – StockExchange'
    setIsStocksLoading(true)
    dispatch(getStocksSearch(search)).finally(() => {
      dispatch(setIsSearching(false))
      setIsStocksLoading(false)
    })
  }, [isSearching])

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
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit}>
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
                    modalBoxDeposit={modalBoxDeposit}
                    setmodalBoxDeposit={setmodalBoxDeposit}
                    modalBoxLog={props.modalBoxLog}
                    setModalBoxLog={props.setModalBoxLog}
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
