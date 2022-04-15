import axios from 'axios'

async function getUserStocks() {
  try {
    const response = await axios.get(`https://gentle-sea-62964.herokuapp.com/api/auth/stock`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
    })
    const stocksInfo = response.data
    const stocksInfoWithPrice = await Promise.all(
      stocksInfo.map(async (item, index) => {
        let data = await getStockPrice(item.symbol)
        let changes = await getStockChange(item.symbol)
        return {
          number: index + 1,
          ...item,
          data,
          changes: Number(changes.slice(0, 4)),
        }
      })
    )

    return stocksInfoWithPrice
  } catch (e) {
    console.log(e)
  }
}

async function getStocksSearch(symbol) {
  try {
    let link
    if (!symbol) link = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=SAIC&apikey=demo`
    else link = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=ACBVRHUCTP4LTHVX`
    const response = await axios.get(link)
    const stocksInfo = response.data['bestMatches'].map((item, index) => {
      return {
        number: index + 1,
        symbol: item['1. symbol'],
        name: item['2. name'],
        currency: item['8. currency'],
        matchScore: item['9. matchScore'],
      }
    })

    const stocksInfoWithPrice = await Promise.all(
      stocksInfo.map(async (item) => {
        let data = await getStockPrice(item.symbol)
        let changes = await getStockChange(item.symbol)
        return {
          ...item,
          data,
          changes: Number(changes.slice(0, 4)),
        }
      })
    )
    return stocksInfoWithPrice
  } catch (e) {
    console.log(e)
  }
}

async function getStockChange(symbol, apikey) {
  try {
    const response = await axios.get(
      // `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo'
    )
    return response.data['Global Quote']['10. change percent']
  } catch (e) {
    console.log(e.message)
  }
}

async function getStockPrice(symbol, apikey) {
  try {
    const response = await axios.get(
      // 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=ACBVRHUCTP4LTHVX'
      'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo'
    )
    let date = Object.keys(response.data['Time Series (Daily)'])
    date.reverse()
    const value = date.map((item) => Number(response.data['Time Series (Daily)'][item]['4. close']))
    const data = []
    for (let num = 99; num >= 0; num--)
      data.unshift({
        date: date,
        value: value[num],
      })
    return data
  } catch (e) {
    console.log(e.message)
  }
}

export { getUserStocks, getStocksSearch }
