import axios from 'axios'
import {
  setAlertMessage,
  setAlertStatus,
  setCurrencies,
  setSelectedCurrency,
  setTransactions,
  setUserBalance,
  setUserCurrencies,
} from '../redux/slice'
// const serverAddress = 'https://stonksexchange-kaivr.amvera.io'
const serverAddress = 'http://localhost:80'

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

export const exchangeCurrency = (symbol, userCurrencies, transactions, amount) => {
  return async (dispatch) => {
    symbol = String(symbol)
    amount = Number(amount)
    await axios
      .post(
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
      .then((response) => {
        dispatch(setUserBalance(response.data.user.balance))
        dispatch(
          setUserCurrencies(
            userCurrencies.map((currency) => {
              if (currency._id !== response.data.currency._id) return currency
              else
                return {
                  ...currency,
                  latestPrice: response.data.currency.latestPrice,
                  amount: response.data.currency.amount,
                }
            })
          )
        )
        dispatch(setSelectedCurrency({ ...response.data.currency, difference: 0 }))
        dispatch(setTransactions([response.data.transaction, ...transactions]))
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}

export const openCurrencyAccount = (userCurrencies, transactions, symbol) => {
  return async (dispatch) => {
    await axios
      .post(
        `${serverAddress}/api/forex/auth/${symbol}/open`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
          },
        }
      )
      .then((response) => {
        dispatch(setTransactions([response.data.transaction, ...transactions]))
        dispatch(setUserCurrencies([...userCurrencies, response.data.currency]))
        dispatch(setSelectedCurrency({ ...response.data.currency, difference: 0 }))
        dispatch(setAlertMessage(response.data.message))
        dispatch(setAlertStatus(response.status))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
      })
  }
}

export const closeCurrencyAccount = (userCurrencies, transactions, symbol) => {
  return async (dispatch) => {
    await axios
      .post(
        `${serverAddress}/api/forex/auth/${symbol}/close`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
          },
        }
      )
      .then((response) => {
        dispatch(setTransactions([response.data.user.transactionExchange, ...transactions]))
        dispatch(setUserBalance(response.data.user.balance))
        dispatch(setUserCurrencies(userCurrencies.filter((currency) => currency.symbol != symbol)))
        dispatch(
          setSelectedCurrency({
            _id: response.data.user.id,
            symbol: 'RUB',
            name: 'Рубль',
            user: response.data.user.id,
            amount: response.data.user.balance,
            __v: 0,
          })
        )
        dispatch(setAlertStatus(response.status))
        dispatch(setAlertMessage(response.data.message))
      })
      .catch((error) => {
        dispatch(setAlertMessage(error.response.data.message))
        dispatch(setAlertStatus(error.response.status))
        throw error.response.data.message
      })
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
