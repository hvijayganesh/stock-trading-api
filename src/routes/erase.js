const tradeDbAccessor = require('../data-access/trade');

// Delete route
const erase = async (req, res) => {
  try {
    await tradeDbAccessor.deleteAll();
    res.status(200).send();
  } catch (err){
    res.status(500).send();
  }
};

export { erase };
