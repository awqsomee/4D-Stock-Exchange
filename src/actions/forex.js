import axios from 'axios'
import { setCurrencies, setUserCurrencies } from '../redux/slice'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'
// const serverAddress = 'http://localhost:5000'

export const getAllCurrencies = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${serverAddress}/api/forex`)
      dispatch(setCurrencies(response.data.currencies))
      return response.data.message
    } catch (e) {
      console.log(e)
    }
  }
}

export const getCurrencyInfo = async (symbol) => {
  try {
    const response = await axios.get(`${serverAddress}/api/forex/${symbol}`)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const getUserCurrencies = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${serverAddress}/api/forex/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      dispatch(setUserCurrencies(response.data.currencies))
      return response.data.message
    } catch (e) {
      console.log(e)
    }
  }
}

export const exchangeCurrency = (userCurrencies, symbol, amount) => {
  return async (dispatch) => {
    try {
      symbol = String(symbol)
      amount = Number(amount)
      const response = await axios.post(
        `${serverAddress}/api/forex/auth`,
        {
          symbol,
          amount,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      userCurrencies = userCurrencies.map((currency) => {
        if (currency.symbol === response.data.user.currency.symbol) {
          currency = response.data.user.currency
        }
        return currency
      })
      dispatch(setUserCurrencies(userCurrencies))
      alert(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
}
