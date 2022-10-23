import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'toolkit',
  initialState: {
    currentUser: {},
    isAuth: false,
    search: '',
    currecncies: [],
    userCurrencies: [],
    selectedCurrency: {},
  },
  reducers: {
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
      state.search = action.payload
    },
    setUserBalance(state, action) {
      state.currentUser.balance = action.payload
    },
    setSelectedCurrency(state, action) {
      state.selectedCurrency = action.payload
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
} = slice.actions
