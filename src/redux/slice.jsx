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
      state.currentUser = {}
      state.isAuth = false
    },
    setSearch(state, action) {
      state.search = action.payload
    },
  },
})

export default slice.reducer
export const { setUser, logout } = slice.actions
