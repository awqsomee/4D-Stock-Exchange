import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'
import { buyStock } from '../../actions/user.js'
import { getStocksSearch } from '../../actions/stocks.js'
import Loader from '../UI/loader/Loader.jsx'

const StockList = (props) => {
  const [stocks, setStocks] = useState([])
  const [run, setRun] = useState()
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const { search, setSearch } = useContext(SearchContext)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState(false)
  // const [buttonText, setButtonText] = useState(0)

  document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      setRun(search.toString())
      fetchData(run)
    }
  })

  // const switchButtonText=(()=>{
  //   setButtonText(props.count * props)
  // })

  useEffect(() => {
    fetchData()
    // setInterval(() => {
    //   fetchData()
    // }, 120000)
  }, [])

  const fetchData = async () => {
    setIsStocksLoading(true)
    let ignore = false
    async function getStocks() {
      const result = await getStocksSearch(search)
      const fish = {
        currency: 'RUB',
        name: 'Специализированный Фонд Приватизации „Чековый инвестиционный фонд аграрно­-промышленного комплекса Республики Татарстан „Золотой Колос“',
        symbol: 'WWWWW',
        changes: '531.43',
        data: [],
      }
      fish.data[99] = { value: 136800.59 }
      if (!ignore) setStocks([...result, fish])
    }
    await getStocks()
    setIsStocksLoading(false)
    return () => {
      ignore = true
    }
  }

  const sorting = (a, b) => {
    const value = filter
    if ((value != '') & (value === 'change')) {
      if (sort) {
        if (Number(a.changes) > Number(b.changes)) {
          return 1
        }
        if (Number(a.changes) < Number(b.changes)) {
          return -1
        }
        return 0
      } else {
        if (Number(a.changes) > Number(b.changes)) {
          return -1
        }
        if (Number(a.changes) < Number(b.changes)) {
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

  return (
    <div className="stockList">
      <div className="container2">
        <div className="title">{props.title}</div>
        <div className="list">
          <Sorting setFilter={setFilter} setSort={setSort} />
          <Panel className="panel" />
          {isStocksLoading ? (
            <Loader />
          ) : (
            stocks &&
            stocks
              .sort(sorting)
              .map((stock) => <Stock stock={stock} function={buyStock} key={stock.symbol} buttonText="Купить" />)
          )}
        </div>
      </div>
    </div>
  )
}

export default StockList
