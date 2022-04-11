const mongoose = require("mongoose");
const axios = require("axios");
const config = require("config");
const Stock = require("../models/Stock");
const stockService = require("../services/stockService");
const compareTime = require("../utils/compareTime");
const User = require("../models/User");
const getPrice = require("../utils/getPrice");

class StockController {
    async buyStock(req, res) {
        try {
            const request = req.body;
            const symbol = request["1. symbol"];
            const name = request["2. name"];
            const type = request["3. type"];
            const region = request["4. region"];
            const marketOpen = request["5. marketOpen"];
            const marketClose = request["6. marketClose"];
            const timezone = request["7. timezone"];
            const currency = request["8. currency"];
            const { quantity } = request;
            if (quantity <= 0) return res.status(400).json("Bad request");
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
            const user = await User.findOne({ _id: req.user.id });
            // Проверяю наличие
            const existResponse = await axios.get(
                `${config.get("AV_SYMBOL_SEARCH")}${stock.symbol}&${config.get("apiKey")}`
            );
            if (!existResponse.data.bestMatches[0]) return res.status(400).json({ message: "Stock not found" });
            const purchasedStock = await Stock.findOne({ symbol });
            // Проверяю торги
            if (!compareTime(stock)) return res.status(400).json({ message: "Stock exchange closed" });
            // Проверяю цену

            // let currentPrice = getPrice(stock.symbol);
            // if (!sessionStorage.getItem(`current${stock.symbol}StockPrice`) && Date(`current${stock.symbol}StockPriceTimestamp`) - Date.now() < 150000) {
            const priceResponse = await axios.get(
                `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${stock.symbol}&interval=5min&${config.get("apiKey")}`
            );
            console.log(priceResponse.data);
            const dailyStockPrices = priceResponse.data["Time Series (5min)"];
            const dates = Object.keys(dailyStockPrices);
            const currentPrice = dailyStockPrices[dates[0]]["4. close"];
            // sessionStorage.setItem(`current${stock.symbol}StockPrice`, currentPrice);
            // sessionStorage.setItem(`current${stock.symbol}StockPriceTimestamp`, Date().now);
            // }
            // currentPrice = Number(sessionStorage.getItem(`current${stock.symbol}StockPrice`));
            stockService.buyStock(user, currentPrice, quantity);
            if (purchasedStock) {
                purchasedStock.quantity += stock.quantity;
                stock = purchasedStock;
            }
            await user.save();
            await stock.save();
            return res.json(stock);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    async getStocks(req, res) {
        try {
            const stocks = await Stock.find({ user: req.user.id });
            if (req.query.symbol) {
                const existResponse = await axios.get(
                    `${config.get("AV_SYMBOL_SEARCH")}${req.query.symbol}&${config.get("apiKey")}`
                );
                const stock = existResponse.data.bestMatches[0];
                if (!stock) return res.status(400).json({ message: "Stock not found" });

                const priceResponse = await axios.get(
                    `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${req.query.symbol}&interval=5min&${config.get(
                        "apiKey"
                    )}`
                );
                console.log(
                    `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${req.query.symbol}&interval=5min&${config.get(
                        "apiKey"
                    )}`
                );

                const dailyStockPrices = priceResponse.data["Time Series (5min)"];
                const dates = Object.keys(dailyStockPrices);
                const currentPrice = dailyStockPrices[dates[0]]["4. close"];
                console.log("price", currentPrice);
                return res.json({ ...stock, currentPrice });
            }
            return res.json(stocks);
        } catch (e) {
            console.log(e);
            return res.status(500).json("Can not get stocks");
        }
    }

    async getStock(req, res) {
        try {
            const response = await axios.get(
                `${config.get("AV_SYMBOL_SEARCH")}${stock.symbol}&${config.get("apiKey")}`
            );
            const stock = response.data.bestMatches[0];
            if (!stock) return res.status(400).json({ message: "Stock not found" });
            getPrice(stock);
            return res.json(stocks);
        } catch (e) {
            console.log(e);
            return res.status(500).json("Can not get stocks");
        }
    }

    async sellStock(req, res) {
        try {
            const stock = await Stock.findOne({ _id: req.query.id, user: req.user.id });
            const user = await User.findOne({ _id: req.user.id });
            const quantity = Number(req.query.quantity);
            if (quantity <= 0) return res.status(400).json("Bad request");
            if (!stock) {
                return res.status(400).json({ message: "Stock not found" });
            }
            const response = await axios.get(
                `${config.get("AV_TIME_SERIES_INTRADAY")}&symbol=${stock.symbol}&interval=5min&${config.get("apiKey")}`
            );
            const dailyStockPrices = response.data["Time Series (5min)"];
            const dates = Object.keys(dailyStockPrices);
            const currentPrice = dailyStockPrices[dates[0]]["4. close"];
            stockService.sellStock(user, stock, currentPrice, quantity);
            if (!stock.quantity) {
                await stock.remove();
                await user.save();
                return res.json({ message: "Stock was sold" });
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
