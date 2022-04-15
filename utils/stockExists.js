const config = require('config');
const axios = require('axios');

module.exports = async (symbol) => {
  try {
    const response = await axios.get(
      `${config.get('AV')}${config.get('AV_SYMBOL_SEARCH')}${symbol}${config.get('apiKey')}`
    );
    return response.data.bestMatches[0];
  } catch (e) {
    console.log(e);
    return e.message;
  }
};
