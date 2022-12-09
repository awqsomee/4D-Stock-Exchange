import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'toolkit',
  initialState: {
    accountUser: {},
    currentUser: {},
    isAuth: false,
    searchQuery: '',
    currecncies: [],
    userCurrencies: [],
    selectedCurrency: {},
    alertMessage: null,
    alertStatus: null,
    stocks: [],
    userStocks: [],
    avatar: '',
  },
  reducers: {
    setAccountUser(state, action) {
      state.accountUser = action.payload
    },
    setUser(state, action) {
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
      state.currentUser = {}
      state.isAuth = false
      state.selectedCurrency = {}
      state.userCurrencies = []
    },
    setCurrencies(state, action) {
      state.currecncies = action.payload
    },
    setUserCurrencies(state, action) {
      state.userCurrencies = action.payload
    },
    setSearch(state, action) {
      state.searchQuery = action.payload
    },
    setUserBalance(state, action) {
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
      state.stocks = action.payload
    },
    setUserStocks(state, action) {
      state.userStocks = action.payload
    },
    setAvatar(state, action) {
      state.avatar = action.payload
    },
  },
})

export default slice.reducer
export const {
  setUser,
  logout,
  setCurrencies,
  setUserCurrencies,
  setSearch,
  setUserBalance,
  setSelectedCurrency,
  setAlertMessage,
  setAlertStatus,
  setAccountUser,
  setStocks,
  setUserStocks,
  setAvatar,
} = slice.actions
