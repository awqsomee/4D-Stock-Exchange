const Stock = require('../models/Stock');
const compareTime = require('../utils/compareTime');
const balanceService = require('./balanceService');
const getPrice = require('../utils/getPrice');

class StockService {
  async buyStock(user, stock, quantity) {
    const price = Number(await getPrice(stock.symbol));
    if (price > 0) {
      balanceService.withdraw(user, price * quantity);
      // Уже купленные акции
      console.log(balanceService.withdraw(user, price * quantity));
      const purchasedStock = await Stock.findOne({ symbol: stock.symbol, user: user.id });
      if (purchasedStock) {
        purchasedStock.quantity += stock.quantity;
        stock = purchasedStock;
      }
      return {
        stock: stock,
        price: price,
      };
    } else return { message: 'Bad request' };
  }

  sellStock(user, stock, price, quantity) {
    if (compareTime(stock)) {
      balanceService.replenish(user, price * quantity);
      stock.quantity -= quantity;
    } else {
      throw 'Stock exchange is closed';
    }
  }

  // getprice(stock) {
  //     return new Promise(async (resolve, reject) => {
  //         try {
  //             const response = await axios.get(
  //                 `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${stock.symbol}&interval=5min&${config.get(
  //                     "apiKey"
  //                 )}`
  //             );
  //             const dailyStockPrices = response.data["Time Series (5min)"];
  //             const dates = Object.keys(dailyStockPrices);
  //             console.log((currentPrice = dailyStockPrices[dates[0]]["4. close"]));
  //             return resolve({ message: "gud" });
  //         } catch (e) {
  //             return reject({ message: "Could not get a price" });
  //         }
  //     });
  // }
}

module.exports = new StockService();
