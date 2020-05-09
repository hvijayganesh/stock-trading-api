const tradeDbAccessor = require('../data-access/trade');
const Errors = require('../common/errors');

const addTrade = async (req, res) => {
  try {
    let trade = await tradeDbAccessor.getById(req.body.id);
    if (trade) {
      throw Errors.TradeExists;
    }
    await tradeDbAccessor.save(req.body);
    res.status(201).send();
  } catch(err) {
    res.status(400).json(err)
  }
};

const getAllTrades = async (req, res) => {
  try {
    let trades = await tradeDbAccessor.getAll();
    res.json(trades);
  } catch(err) {
    res.status(400).json(err)
  }
}

const getTradesByUserId = async (req, res) => {
  try {
    let trades = await tradeDbAccessor.getTradesByUserId(req.params.user_id);
    res.json(trades);
  } catch(err) {
    res.status(400).json(err)
  }
}

const getFilteredTrades = async (req, res) => {
  try {
    let trades = await tradeDbAccessor.getFilteredTrades(req);
    res.json(trades);
  } catch(err) {
    res.status(400).json(err)
  }
}

/**
 * Add more trade routes here
 */

export { addTrade, getAllTrades, getTradesByUserId, getFilteredTrades };
