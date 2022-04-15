import React, { useContext, useTransition } from 'react'
//  import classes from './search_header.module.css'
import '../input/input.css'
import { SearchContext } from '../../../context'

// const Stocks = () => {
//   const cockInfo = [
//     { number: 0, symbol: 'AAPL', name: 'Apple Inc', currency: 'USD' },
//     { number: 1, symbol: 'AAPL34.SAO', name: 'Apple Inc', currency: 'BRL' },
//     { number: 2, symbol: 'AAPLUSTRAD.BSE', name: 'AA Plus Tradelink Ltd', currency: 'INR' },
//   ]
// }

const SearchHeader = (props) => {
  // const [value, setValue] = useState('')
  const { search, setSearch } = useContext(SearchContext)

  // const filteredStocks = cockInfo.filter((stock) => {
  //   return stock.name.toLowerCase().includes(value.toLowerCase())
  // })
  return (
    <input
      className="search"
      onChange={(event) => setSearch(event.target.value)}
      value={search}
      type={props.type}
      placeholder={props.placeholder}
    />
  )
}

export default SearchHeader
