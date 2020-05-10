const _ = require('lodash');

module.exports = {
    responseFormatter(trades) {
        let formattedTrades = [];
        let ignoreFields = ['user_id', 'user_name'];
         _.each(trades, (trade) => {
            let omitted = _.pick(trade, ignoreFields);
            let transformedTrade =  _.omit(trade, ignoreFields)
            _.merge(transformedTrade, {
                user: {
                    id: omitted.user_id,
                    name: omitted.user_name
                }
            })
            formattedTrades.push(transformedTrade);
        })
        return formattedTrades;
    }
};