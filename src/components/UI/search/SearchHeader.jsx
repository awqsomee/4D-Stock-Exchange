//  import classes from './search_header.module.css'
import '../../navbar/navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../../../redux/slice'
import Search from '../../../assets/Icons/search.svg'

// const Stocks = () => {
//   const cockInfo = [
//     { number: 0, symbol: 'AAPL', name: 'Apple Inc', currency: 'USD' },
//     { number: 1, symbol: 'AAPL34.SAO', name: 'Apple Inc', currency: 'BRL' },
//     { number: 2, symbol: 'AAPLUSTRAD.BSE', name: 'AA Plus Tradelink Ltd', currency: 'INR' },
//   ]
// }

const SearchHeader = () => {
  const search = useSelector((state) => state.toolkit.searchQuery)
  const dispatch = useDispatch()
  return (
    <div className="navbar__search">
      <input
        className="search"
        onChange={(event) => dispatch(setSearch(event.target.value))}
        value={search}
        type={'text'}
        placeholder={'Поиск...'}
      />
      <div className="navbar__search__img">
        <img src={Search} width={25} />
      </div>
    </div>
  )
}

export default SearchHeader
