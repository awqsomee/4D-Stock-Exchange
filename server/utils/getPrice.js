const config = require("config");
const axios = require("axios");

module.exports = async (symbol) => {
    // return new Promise((resolve, reject) => {
    //     try {
    //         console.log("GetStock");
    //         const response = await axios.get(
    //             `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${symbol}&interval=5min&${config.get("apiKey")}`
    //         );
    //         const dailyStockPrices = response.data["Time Series (5min)"];
    //         const dates = Object.keys(dailyStockPrices);
    //         currentPrice = dailyStockPrices[dates[0]]["4. close"];
    //         (console.log(currentPrice));
    //         return currentPrice;
    //     } catch (e) {
    //         return json({ message: "Could not get price" });
    //     }
    // })
    // try {
    //     console.log("GetStock");
    //     const response = await axios.get(
    //         `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${symbol}&interval=5min&${config.get("apiKey")}`
    //     );
    //     const dailyStockPrices = response.data["Time Series (5min)"];
    //     const dates = Object.keys(dailyStockPrices);
    //     currentPrice = dailyStockPrices[dates[0]]["4. close"];
    //     response.then(console.log(currentPrice));
    //     return currentPrice;
    // } catch (e) {
    //     return json({ message: "Could not get price" });
    // }
};
