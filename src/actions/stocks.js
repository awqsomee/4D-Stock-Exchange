import axios from 'axios'
import { store } from '../redux'
import { setAlertMessage, setAlertStatus, setStocks, setUserBalance, setUserStocks } from '../redux/slice'
// const serverAddress = 'https://stonksexchange-kaivr.amvera.io'
const serverAddress = 'http://localhost:80'

function getUserStocks() {
  return async (dispatch) => {
    try {
      await axios
        .get(`${serverAddress}/api/stocks/auth`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
          },
        })
        .then((response) => {
          const data = response.data.stocks
          dispatch(setUserStocks(data))
        })
        .catch((error) => {
          console.log(error.response.data.message)
        })
      return
    } catch (e) {
      console.log(e)
    }
  }
}

function getStocksSearch(searchQuery) {
  return async (dispatch) => {
    try {
      if (searchQuery) {
        const URI = `${serverAddress}/api/stocks/search?q=${searchQuery}`
        const encodedURI = encodeURI(URI)
        await axios
          .get(encodedURI)
          .then((response) => {
            const data = response.data.stock
            dispatch(setStocks(data))
          })
          .catch((error) => {
            console.log(error.response.data.message)
            if (error.response.data.message === 'Акции не найдены') dispatch(setStocks([]))
          })
      } else {
        const URI1 = `${serverAddress}/api/stocks/search?q=MGNT`
        const URI2 = `${serverAddress}/api/stocks/search?q=GAZP`
        const URI3 = `${serverAddress}/api/stocks/search?q=YANDEX`
        const search1 = await axios
          .get(URI1)
          .then((response) => {
            const data = response.data.stock
            return data
          })
          .catch((error) => {
            console.log(error.response.data.message)
          })
        const search2 = await axios
          .get(URI2)
          .then((response) => {
            const data = response.data.stock
            return data
          })
          .catch((error) => {
            console.log(error.response.data.message)
          })
        const search3 = await axios
          .get(URI3)
          .then((response) => {
            const data = response.data.stock
            return data
          })
          .catch((error) => {
            console.log(error.response.data.message)
          })
        const result = [...search1, ...search2, ...search3]
        dispatch(setStocks(result))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

function exchangeStocks(symbol, amount) {
  return async (dispatch) => {
    try {
      const URI = `${serverAddress}/api/stocks/auth`
      const encodedURI = encodeURI(URI)
      await axios
        .post(
          encodedURI,
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
          const { stock, user, transaction } = response.data
          dispatch(setUserBalance(user.balance))
          if (amount < 0)
            dispatch(
              setUserStocks(
                store
                  .getState()
                  .toolkit.userStocks.map((userStock) => {
                    if (userStock.symbol === stock.symbol) return stock
                    else return userStock
                  })
                  .filter((stock) => stock.amount != 0)
              )
            )
          dispatch(setAlertStatus(response.status))
          dispatch(setAlertMessage(response.data.message))
        })
        .catch((error) => {
          dispatch(setAlertMessage(error.response.data.message))
          dispatch(setAlertStatus(error.response.status))
          throw error.response.data.message
        })
    } catch (e) {
      console.log(e)
    }
  }
}

export { getUserStocks, getStocksSearch, exchangeStocks }
