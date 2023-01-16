import { createSlice } from '@reduxjs/toolkit'
import { accountUser, stocks, transactions, user, userCurrencies, userStocks } from './mock'
const slice = createSlice({
  name: 'toolkit',
  initialState: {
    accountUser: {},
    currentUser: {},
    isAuth: false,
    searchQuery: '',
    isSearching: false,
    currecncies: {},
    userCurrencies: [],
    selectedCurrency: {},
    alertMessage: null,
    alertStatus: null,
    stocks: [],
    userStocks: [],
    avatar: '',
    transactions: [],
    isServiceUnavailable: false,
  },
  reducers: {
    setIsServiceUnavailable(state) {
      state.isServiceUnavailable = true
      state.isAuth = true
      state.stocks = stocks
      state.currentUser = user
      state.selectedCurrency = {
        _id: '631f49c56a953ba4e8e1e19d22',
        symbol: 'RUB',
        name: 'Рубль',
        user: '631f49c56a953ba4e8e1e19d22',
        amount: 4587.41,
        __v: 0,
      }
      state.accountUser = accountUser
      state.userStocks = userStocks
      state.userCurrencies = userCurrencies
      state.transactions = transactions
    },
    setAccountUser(state, action) {
      console.log('au', action.payload)
      state.accountUser = action.payload
    },
    setUser(state, action) {
      console.log('u', action.payload)
      state.currentUser = action.payload
      state.isAuth = true
      state.selectedCurrency = {
        _id: action.payload.id,
        symbol: 'RUB',
        name: 'Рубль',
        user: action.payload.id,
        amount: action.payload.balance,
        __v: 0,
      }
    },
    logout(state) {
      localStorage.removeItem('stonksToken')
      state.accountUser = {}
      state.searchQuery = ''
      state.currecncies = {}
      state.userStocks = []
      state.currentUser = {}
      state.isAuth = false
      state.avatar = ''
      state.transactions = []
      state.selectedCurrency = {}
      state.userCurrencies = []
    },
    setCurrencies(state, action) {
      console.log('c', action.payload)
      state.currecncies = action.payload
    },
    setUserCurrencies(state, action) {
      console.log('uc', action.payload)
      state.userCurrencies = action.payload
    },
    setSearch(state, action) {
      state.searchQuery = action.payload
    },
    setIsSearching(state, action) {
      state.isSearching = action.payload
    },
    setUserBalance(state, action) {
      console.log('b', action.payload)
      state.currentUser.balance = action.payload
    },
    setSelectedCurrency(state, action) {
      state.selectedCurrency = action.payload
    },
    setAlertMessage(state, action) {
      state.alertMessage = action.payload
    },
    setAlertStatus(state, action) {
      state.alertStatus = action.payload
    },
    setStocks(state, action) {
      console.log('s', action.payload)
      state.stocks = action.payload
    },
    setUserStocks(state, action) {
      console.log('us', action.payload)
      state.userStocks = action.payload
    },
    setAvatar(state, action) {
      state.avatar = action.payload
    },
    setTransactions(state, action) {
      console.log('t', action.payload)
      state.transactions = action.payload
    },
  },
})

export default slice.reducer
export const {
  setIsServiceUnavailable,
  setUser,
  logout,
  setCurrencies,
  setUserCurrencies,
  setSearch,
  setIsSearching,
  setUserBalance,
  setSelectedCurrency,
  setAlertMessage,
  setAlertStatus,
  setAccountUser,
  setStocks,
  setUserStocks,
  setAvatar,
  setTransactions,
} = slice.actions
