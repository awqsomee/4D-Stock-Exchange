const { json, request } = require("express");
const compareTime = require("../utils/compareTime");
const balanceService = require("./balanceService");

class StockService {
    buyStock(user, price, quantity) {
        price = Number(price);
        if (typeof price === "number" && price > 0) {
            console.log(price);
            console.log(user);
            balanceService.withdraw(user, price * quantity);
            return json({ message: "Stock was bought" });
        } else return json({ message: "Bad request" });
    }

    sellStock(user, stock, price, quantity) {
        if (compareTime(stock)) {
            balanceService.replenish(user, price * quantity);
            stock.quantity -= quantity;
        } else {
            throw "Stock exchange is closed";
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
