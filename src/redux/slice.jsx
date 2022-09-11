import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'toolkit',
  initialState: {
    currentUser: {},
    isAuth: false,
    search: '',
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
    setSearch(state, action) {
      state.search = action.payload
    },
    setUserBalance(state, action) {
      state.currentUser.balance = action.payload
    },
  },
})

export default slice.reducer
export const { setUser, logout, setSearch, setUserBalance } = slice.actions
