const db = require('../database');

module.exports = {
  async save(payload) {
    try {
      let sql = 'INSERT INTO trade (id, type, user_id, user_name, symbol, shares, price, timestamp) VALUES (?,?,?,?,?,?,?,?)'
      let params = [payload.id, payload.type, payload.user.id, payload.user.name, payload.symbol, payload.shares, payload.price, payload.timestamp];
      await db.run(sql, params);
    } catch (err) {
      throw err;
    }
  },

  getById(tradeId) {
    return new Promise(function(resolve, reject) {
        let sql = "Select * from trade where id = ?"
        let params = [tradeId]
        db.get(sql, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
              resolve(row)
            }
        })
    }) 
  },

  getAll() {
    return new Promise(function(resolve, reject) {
        let sql = "Select * from trade order by id"
        db.all(sql, function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
              resolve(rows)
            }
        })
    }) 
  },

  deleteAll() {
    return new Promise(function(resolve, reject) {
        let sql = "delete from trade"
        db.all(sql, function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
              resolve(rows)
            }
        })
    }) 
  },

  getTradesByUserId(userId) {
    return new Promise(function(resolve, reject) {
        let sql = "Select * from trade where user_id = ? order by id"
        let params = [userId]
        db.all(sql, params, function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
              resolve(rows)
            }
        })
    }) 
  },

  getFilteredTrades(request) {
    let { symbol } = request.params
    let { type, start, end } = request.query;
    return new Promise(function(resolve, reject) {
        let sql = "Select * from trade where symbol = ? and type = ? and timestamp between ? and ? order by id"
        let params = [symbol, type, start, end]
        db.all(sql, params, function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
              resolve(rows)
            }
        })
    }) 
  },
};