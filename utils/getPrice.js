const config = require('config');
const axios = require('axios');

module.exports = async (symbol) => {
  try {
    const response = await axios.get(
      `${config.get('AV')}${config.get('AV_TIME_SERIES_INTRADAY')}${symbol}${config.get('apiKey')}`
    );
    if (!response.data['Time Series (5min)']) throw 'Bad request';
    const dailyStockPrices = response.data['Time Series (5min)'];
    const dates = Object.keys(dailyStockPrices);
    currentPrice = dailyStockPrices[dates[0]]['4. close'];
    return currentPrice;
  } catch (e) {
    console.log(e);
    return { message: 'Could not get stock price' };
  }
};
