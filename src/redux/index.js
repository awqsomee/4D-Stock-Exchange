import { combineReducers, configureStore } from '@reduxjs/toolkit'
import slice from './slice'

const rootReducer = combineReducers({
  toolkit: slice,
})

export const store = configureStore({
  reducer: rootReducer,
})
