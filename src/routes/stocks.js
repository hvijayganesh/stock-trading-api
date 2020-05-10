const tradeDbAccessor = require('../data-access/trade');
const tradesHelper = require('../common/trades-helper');
const Errors = require('../common/errors');
const _ = require('lodash');

const getStocksBySymbolAndType = async (req, res) => {
  try {
    let { symbol } = req.params
    let { type, start, end } = req.query;
    let symbolExists = await tradeDbAccessor.checkIfSymbolExists(symbol);
    if (_.isEmpty(symbolExists)) {
      throw Errors.TradeSymbolNotFound
    }
    let trades = await tradeDbAccessor.getStocksBySymbolAndType({symbol, type, start, end});
    res.json(tradesHelper.responseFormatter(trades));
  } catch (err) {
    if (err.message == 'TradeSymbolNotFound') {
      res.status(404).json({})
    } else {
      res.status(400).json(err)
    }
  }
}

const getStockPrice = async (req, res) => {
  try {
    let { symbol } = req.params
    let { start, end } = req.query;
    let symbolExists = await tradeDbAccessor.checkIfSymbolExists(symbol);
    if (_.isEmpty(symbolExists)) {
      throw Errors.TradeSymbolNotFound
    }
    let trades = await tradeDbAccessor.getStockPrice({symbol, start, end});
    if (_.isEmpty(trades)) {
      throw Errors.TradesNotFoundInRange;
    }
    let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;
    _.each(trades, (trade) => {
      if (trade.price > max) {
        max = trade.price;
      }
      if (trade.price < min) {
        min = trade.price;
      }
    })
    res.json({
      symbol,
      highest: max,
      lowest: min
    });
  } catch (err) {
    if (err.message == 'TradeSymbolNotFound') {
      res.status(404).json({}) 
    } else if (err.error == 'TradesNotFoundInRange') {
      res.status(200).json({message: err.message})
    } else {
      res.status(400).json(err)
    }
  }
}

export { getStocksBySymbolAndType, getStockPrice };
