import axios from 'axios'

async function getUserStocks() {
  try {
    const stocks = await axios
      .get(`https://stonksexchange.kaivr.amvera.io/api/stocks/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
        },
      })
      .then((response) => {
        const data = response.data.stocks
        return data
      })
      .catch((error) => {
        console.log(error.response.data.message)
      })
    return stocks
  } catch (e) {
    console.log(e)
  }
}

async function getStocksSearch(searchQuery) {
  try {
    const URI = `https://stonksexchange.kaivr.amvera.io/api/stocks/search?q=${searchQuery}`
    const encodedURI = encodeURI(URI)
    const response = await axios.get(encodedURI)
    return response.data.stock
  } catch (e) {
    console.log(e)
  }
}

export { getUserStocks, getStocksSearch }
