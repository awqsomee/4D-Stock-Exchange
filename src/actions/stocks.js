import axios from 'axios'

async function getUserStocks() {
  try {
    const response = await axios.get(`https://stonksexchange.kaivr.amvera.io/api/auth/stock`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
      },
    })
    const stocksInfo = response.data
    if (Array.isArray(stocksInfo)) {
      const stocksInfoWithPrice = await Promise.all(
        stocksInfo.map(async (item, index) => {
          if (index < 1) {
            let data = await getStockPrice(item.symbol)
            let changes = await getStockChange(item.symbol)
            return {
              number: index + 1,
              ...item,
              data,
              changes: Number(changes.slice(0, 4)),
            }
          }
        })
      )
      return stocksInfoWithPrice
    } else return []
  } catch (e) {
    // console.log(e)
  }
}

async function getStocksSearch(searchQuery) {
  try {
    let link
    link = `https://stonksexchange.kaivr.amvera.io/api/stock/search?q=${searchQuery}`
    const response = await axios.get(link)
    const stocksInfo = response.data.stock
    // const result = stocksInfoWithPrice.map(
    //   (el) => {
    //     if (searchQuery != '' || el.symbol.toLowerCase().includes(searchQuery)) {
    //       console.log('y', el)
    //       return el
    //     } else {
    //       console.log('n', el)
    //       return el
    //     }
    //   },
    //   [searchQuery]
    // )
    // console.log('resultget', result)
    return response.data.stock
    // return stocksInfoWithPrice
  } catch (e) {
    // console.log(e)
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
    // console.log(e.message)
  }
}

async function getStockPrice(symbol, apikey) {
  try {
    const response = await axios.get(
      // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=ACBVRHUCTP4LTHVX`
      'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo'
      // https://gentle-sea-62964.herokuapp.com/api/stock?symbol=GAZP&from=2020-10-30&till=2021-11-30
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
    // console.log(e.message)
  }
}

export { getUserStocks, getStocksSearch }
