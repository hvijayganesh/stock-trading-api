const tradeDbAccessor = require('../data-access/trade');
const Errors = require('../common/errors');
const tradesHelper = require('../common/trades-helper');
const _ = require('lodash');

const addTrade = async (req, res) => {
  try {
    let trade = await tradeDbAccessor.getById(req.body.id);
    if (trade) {
      throw Errors.TradeExists;
    }
    await tradeDbAccessor.save(req.body);
    res.status(201).json({});
  } catch(err) {
    res.status(400).json(err)
  }
};

const getAllTrades = async (req, res) => {
  try {
    let trades = await tradeDbAccessor.getAll(); 
    res.json(tradesHelper.responseFormatter(trades));
  } catch(err) {
    res.status(400).json(err)
  }
}

const getTradesByUserId = async (req, res) => {
  try {
    let trades = await tradeDbAccessor.getTradesByUserId(req.params.user_id);
    if (_.isEmpty(trades)) {
      throw Errors.TradeNotFoundForUser;
    }
    res.json(tradesHelper.responseFormatter(trades));
  } catch(err) {
    if (err.message == "TradeNotFoundForUser") {
      res.status(404).json({})
    } else {
      res.status(400).json(err)
    }
  }
}
/**
 * Add more trade routes here
 */

export { addTrade, getAllTrades, getTradesByUserId };
