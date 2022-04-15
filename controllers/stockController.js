const axios = require('axios');
const config = require('config');
const Stock = require('../models/Stock');
const stockService = require('../services/stockService');
const compareTime = require('../utils/compareTime');
const User = require('../models/User');
const getPrice = require('../utils/getPrice');
const stockExists = require('../utils/stockExists');

class StockController {
  async buyStock(req, res) {
    try {
      // Получаем данные из Alpha Vantage API
      const request = req.body;
      const symbol = request['1. symbol'];
      const name = request['2. name'];
      const type = request['3. type'];
      const region = request['4. region'];
      const marketOpen = request['5. marketOpen'];
      const marketClose = request['6. marketClose'];
      const timezone = request['7. timezone'];
      const currency = request['8. currency'];
      const { quantity } = request;
      if (quantity <= 0) return res.status(400).json('Bad request');
      // Записываем данные в модель акции
      let stock = new Stock({
        symbol,
        name,
        type,
        region,
        marketOpen,
        marketClose,
        timezone,
        currency,
        user: req.user.id,
        quantity,
      });

      if (!(await stockExists(stock.symbol))) return res.status(400).json({ message: 'Stock not found' });

      if (!compareTime(stock)) return res.status(400).json({ message: 'Stock exchange closed' });
      // Пользователь, отправивший запрос
      let user = await User.findOne({ _id: req.user.id });

      const response = await stockService.buyStock(user, stock, quantity);
      stock = response.stock;
      await user.save();
      await stock.save();
      return res.json(stock);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getStocks(req, res) {
    try {
      const stocks = await Stock.find({ user: req.user.id });
      if (req.query.symbol) {
        const existResponse = await axios.get(
          `${config.get('AV')}${config.get('AV_SYMBOL_SEARCH')}${req.query.symbol}${config.get('apiKey')}`
        );
        const stock = existResponse.data.bestMatches[0];
        if (!stock) return res.status(400).json({ message: 'Stock not found' });
        const price = await getPrice(req.query.symbol);
        return res.json({ ...stock, price });
      }
      return res.json(stocks);
    } catch (e) {
      console.log(e);
      return res.status(500).json('Can not get stocks');
    }
  }

  async sellStock(req, res) {
    try {
      const stock = await Stock.findOne({ _id: req.query.id, user: req.user.id });
      const user = await User.findOne({ _id: req.user.id });
      const quantity = Number(req.query.quantity);
      if (quantity <= 0) return res.status(400).json('Bad request');
      if (quantity > stock.quantity) return res.status(400).json('Not enough stocks');
      console.log(quantity);
      console.log(stock.quantity);
      if (!stock) {
        return res.status(400).json({ message: 'Stock not found' });
      }
      const response = await axios.get(
        `${config.get('AV')}${config.get('AV_TIME_SERIES_INTRADAY')}${stock.symbol}${config.get('apiKey')}`
      );
      const dailyStockPrices = response.data['Time Series (5min)'];
      const dates = Object.keys(dailyStockPrices);
      const currentPrice = dailyStockPrices[dates[0]]['4. close'];
      stockService.sellStock(user, stock, currentPrice, quantity);
      if (!stock.quantity) {
        await stock.remove();
        await user.save();
        return res.json({ message: 'Stock was sold' });
      }
      await user.save();
      await stock.save();
      return res.json(stock);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }
}

module.exports = new StockController();
