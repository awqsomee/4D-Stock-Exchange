import React, { useContext, useTransition } from 'react'
//  import classes from './search_header.module.css'
import '../input/input.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../../../redux/slice'

// const Stocks = () => {
//   const cockInfo = [
//     { number: 0, symbol: 'AAPL', name: 'Apple Inc', currency: 'USD' },
//     { number: 1, symbol: 'AAPL34.SAO', name: 'Apple Inc', currency: 'BRL' },
//     { number: 2, symbol: 'AAPLUSTRAD.BSE', name: 'AA Plus Tradelink Ltd', currency: 'INR' },
//   ]
// }

const SearchHeader = () => {
  const search = useSelector((state) => state.toolkit.search)
  const dispatch = useDispatch()
  return (
    <input
      className="search"
      onChange={(event) => dispatch(setSearch(event.target.value))}
      value={search}
      type={'text'}
      placeholder={'Поиск...'}
    />
  )
}

export default SearchHeader
