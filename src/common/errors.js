module.exports = {
    TradeExists: {
        statusCode: 400,
        error: 'Trade Exists',
        message: 'Trade with same id already exists'
    },
    TradeNotFoundForUser: {
        statusCode: 404,
        error: 'TradeNotFoundForUser',
        message: 'TradeNotFoundForUser'
    },
    TradeSymbolNotFound: {
        statusCode: 404,
        error: 'TradeSymbolNotFound',
        message: 'TradeSymbolNotFound'
    },
    TradesNotFoundInRange: {
        statusCode: 200,
        error: 'TradesNotFoundInRange',
        message: 'There are no trades in the given date range'
    }
}