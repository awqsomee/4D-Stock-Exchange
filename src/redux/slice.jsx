import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'toolkit',
  initialState: {
    currentUser: {},
    isAuth: false,
    search: '',
    currecncies: [],
    userCurrencies: [],
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload
      state.isAuth = true
    },
    logout(state) {
      localStorage.removeItem('stonksToken')
      state.currentUser = {}
      state.isAuth = false
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
  },
})

export default slice.reducer
export const { setUser, logout, setCurrencies, setUserCurrencies, setSearch, setUserBalance } = slice.actions
