import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { buyStock } from '../../actions/user.js'
import { getStocksSearch } from '../../actions/stocks.js'
import Loader from '../UI/loader/Loader.jsx'
import { useSelector } from 'react-redux'

const StockList = (props) => {
  const [stocks, setStocks] = useState([])
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState(false)
  const search = useSelector((state) => state.toolkit.searchQuery)
  // const [buttonText, setButtonText] = useState(0)

  document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
      console.log(1)
      fetchData(search)
    }
    console.log(2)
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

  const fetchData = async (searchQuery) => {
    setIsStocksLoading(true)
    let ignore = false
    async function getStocks() {
      let result
      if (searchQuery) result = await getStocksSearch(searchQuery)
      else result = await getStocksSearch('MGNT')

      console.log('res', result)
      const fish = {
        currency: 'RUB',
        name: 'Специализированный Фонд Приватизации „Чековый инвестиционный фонд аграрно­-промышленного комплекса Республики Татарстан „Золотой Колос“',
        symbol: 'WWWWW',
        changes: '531.43',
        data: [],
      }
      fish.data[99] = { value: 136800.59 }
      // const salmon = [
      //   {
      //     changes: '-0.1',
      //     currency: 'USD',
      //     matchScore: '1.0000',
      //     name: 'Science Applications International Corp',
      //     number: 1,
      //     symbol: 'SAIC1',
      //     data: result[1].data,
      //   },
      //   {
      //     changes: '-0.2',
      //     currency: 'USD',
      //     matchScore: '1.0000',
      //     name: 'Science Applications International Corp',
      //     number: 1,
      //     symbol: 'SAIC2',
      //     data: result[1].data,
      //   },
      //   {
      //     changes: '4',
      //     currency: 'USD',
      //     matchScore: '1.0000',
      //     name: 'Science Applications International Corp',
      //     number: 1,
      //     symbol: 'SAIC3',
      //     data: result[1].data,
      //   },
      //   {
      //     changes: '14',
      //     currency: 'USD',
      //     matchScore: '1.0000',
      //     name: 'Science Applications International Corp',
      //     number: 1,
      //     symbol: 'SAIC4',
      //     data: result[1].data,
      //   },
      // ]
      console.log('result', result)
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
      {console.log(stocks)}
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
              .map((stock) => <Stock stock={stock} function={buyStock} key={stock.isin} buttonText="Купить" />)
          )}
        </div>
      </div>
    </div>
  )
}

export default StockList
