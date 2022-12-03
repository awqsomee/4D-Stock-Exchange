import axios from 'axios'
import { store } from '../redux'
import { setStocks, setUserBalance, setUserStocks } from '../redux/slice'

function getUserStocks() {
  return async (dispatch) => {
    try {
      await axios
        .get(`https://stonksexchange.kaivr.amvera.io/api/stocks/auth`, {
          // .get(`http://localhost:5000/api/stocks/auth`, {
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
        const URI = `https://stonksexchange.kaivr.amvera.io/api/stocks/search?q=${searchQuery}`
        // const URI = `http://localhost:5000/api/stocks/search?q=${searchQuery}`
        const encodedURI = encodeURI(URI)
        await axios
          .get(encodedURI)
          .then((response) => {
            const data = response.data.stock
            dispatch(setStocks(data))
          })
          .catch((error) => {
            console.log(error.response.data.message)
          })
      } else {
        const URI1 = `https://stonksexchange.kaivr.amvera.io/api/stocks/search?q=MGNT`
        // const URI1 = `http://localhost:5000/api/stocks/search?q=MGNT`
        const URI2 = `https://stonksexchange.kaivr.amvera.io/api/stocks/search?q=GAZP`
        // const URI2 = `http://localhost:5000/api/stocks/search?q=GAZP`
        const URI3 = `https://stonksexchange.kaivr.amvera.io/api/stocks/search?q=YANDEX`
        // const URI3 = `http://localhost:5000/api/stocks/search?q=YANDEX`
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
      const URI = `https://stonksexchange.kaivr.amvera.io/api/stock/auth`
      // const URI = `http://localhost:5000/api/stocks/auth`
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
        })
        .catch((error) => {
          console.log(error.response.data.message)
        })
    } catch (e) {
      console.log(e)
    }
  }
}

export { getUserStocks, getStocksSearch, exchangeStocks }
