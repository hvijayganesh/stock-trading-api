import express from 'express';

import { erase } from './erase';
import { addTrade, getAllTrades, getTradesByUserId } from './trades';
import { getStocksBySymbolAndType, getStockPrice } from './stocks';

const router = express.Router();

router.delete('/erase', erase);

router.post('/trades', addTrade);

router.get('/trades', getAllTrades);

router.get('/trades/users/:user_id', getTradesByUserId);

router.get('/stocks/:symbol/trades', getStocksBySymbolAndType);

router.get('/stocks/:symbol/price', getStockPrice);

export default router;
