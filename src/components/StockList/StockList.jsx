import React, { useEffect, useState } from 'react'
import Sorting from '../sorting/Sorting.jsx'
import Panel from '../panel/Panel.jsx'
import './stocklist.css'
import Stock from '../stocks/Stock.jsx'
import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'
import { buyStock } from '../../actions/user.js'
import { getStocksSearch } from '../../actions/stocks.js'

const StockList = (props) => {
  const [stocks, setStocks] = useState([])
  const [run, setRun] = useState()
  const [isStocksLoading, setIsStocksLoading] = useState(false)
  const { search, setSearch } = useContext(SearchContext)
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
    //   console.log(1)
    // }, 120000)
  }, [])

  const fetchData = async () => {
    setIsStocksLoading(true)
    let ignore = false
    async function getStocks() {
      const result = await getStocksSearch(search)
      if (!ignore) setStocks(result)
    }
    await getStocks()
    setIsStocksLoading(false)
    return () => {
      ignore = true
    }
  }

  return (
    <div className="stockList">
    <div className="container2">
      <div className="title">{props.title}</div>
        <div className="list">
          <Sorting />
          <Panel className="panel" />
          {isStocksLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>Акции загружаются...</div>
          ) : (
            stocks &&
            stocks.map((stock) => <Stock stock={stock} function={buyStock} key={stock.symbol} buttonText='Купить'/>)
          )}
        </div>
      </div>
    </div>
  )
}

export default StockList
