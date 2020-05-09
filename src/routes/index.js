import express from 'express';

import { erase } from './erase';
import { addTrade, getAllTrades, getTradesByUserId, getFilteredTrades } from './trades';

const router = express.Router();

router.delete('/erase', erase);

router.post('/trades', addTrade);

router.get('/trades', getAllTrades);

router.get('/trades/users/:user_id', getTradesByUserId);

router.get('/trades/stocks/:symbol/trades', getFilteredTrades);

export default router;
