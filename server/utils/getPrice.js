const config = require("config");
const axios = require("axios");

module.exports = async (stock) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(
                `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${stock.symbol}&interval=5min&${config.get("apiKey")}`
            );
            const dailyStockPrices = response.data["Time Series (5min)"];
            const dates = Object.keys(dailyStockPrices);
            console.log((currentPrice = dailyStockPrices[dates[0]]["4. close"]));
            return resolve({ message: "gud" });
        } catch (e) {
            return reject({ message: "Could not get a price" });
        }
    });
};
