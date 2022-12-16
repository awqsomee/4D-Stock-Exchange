import React, { useEffect, useMemo, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { buyStock } from '../../actions/user.js'
import { getStocksSearch } from '../../actions/stocks.js'
import Loader from '../UI/loader/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearching, setSearch } from '../../redux/slice.jsx'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit.jsx'

const StockList = (props) => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.toolkit.stocks)
  const isSearching = useSelector((state) => state.toolkit.isSearching)
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const [filter, setFilter] = useState('change')
  const [sort, setSort] = useState(false)
  const search = useSelector((state) => state.toolkit.searchQuery)
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)
  const alertStatus = useSelector((state) => state.toolkit.alertStatus)

  useEffect(() => {
    document.title = 'STONKS – StockExchange'
    setIsStocksLoading(true)
    dispatch(getStocksSearch(search)).finally(() => {
      dispatch(setIsSearching(false))
      setIsStocksLoading(false)
    })
  }, [isSearching])

  useEffect(() => {
    if (modalBoxDeposit) {
      const timeId = setTimeout(() => {
        setmodalBoxDeposit(false)
      }, 1500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [modalBoxDeposit])

  const sorting = (a, b) => {
    const value = filter
    if ((value != '') & (value === 'change')) {
      if (sort) {
        if (
          Number((a.prices[0].close - a.prices[1].close) / 100) > Number((b.prices[0].close - b.prices[1].close) / 100)
        ) {
          return 1
        }
        if (
          Number((a.prices[0].close - a.prices[1].close) / 100) < Number((b.prices[0].close - b.prices[1].close) / 100)
        ) {
          return -1
        }
        return 0
      } else {
        if (
          Number((a.prices[0].close - a.prices[1].close) / 100) > Number((b.prices[0].close - b.prices[1].close) / 100)
        ) {
          return -1
        }
        if (
          Number((a.prices[0].close - a.prices[1].close) / 100) < Number((b.prices[0].close - b.prices[1].close) / 100)
        ) {
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

  return (
    <div className="stockList">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit} alertStatus={alertStatus}>
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
