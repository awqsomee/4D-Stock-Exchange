import axios from 'axios'
import { setCurrencies, setSelectedCurrency, setUserCurrencies } from '../redux/slice'
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
        },
      })
      dispatch(setUserCurrencies(response.data.currencies))
      return response.data.message
    } catch (e) {
      console.log(e)
    }
  }
}

export const exchangeCurrency = (symbol, amount) => {
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
          },
        }
      )
      alert(response.data.message)
      return response.data.currency
    } catch (e) {
      console.log(e)
    }
  }
}

export const openCurrencyAccount = async (symbol) => {
  try {
    const response = await axios.post(`${serverAddress}/api/forex/auth/${symbol}/open`)
    alert(response.data.message)
  } catch (e) {
    console.log(e)
  }
}

export const closeCurrencyAccount = async (symbol) => {
  try {
    const response = await axios.post(`${serverAddress}/api/forex/auth/${symbol}/close`)
    alert(response.data.message)
  } catch (e) {
    console.log(e)
  }
}

// export const getSelectedCurrency = async () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`${serverAddress}/api/forex/auth`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
//         },
//       })
//       return response.data.message
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }
