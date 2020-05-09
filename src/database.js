var sqlite3 = require('sqlite3').verbose()


const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE trade (
          id INTEGER,
          type TEXT,
          user_id INTEGER,
          user_name TEXT,
          symbol TEXT,
          shares INTEGER,
          price REAL,
          timestamp TEXT
        )`,(err) => {
        if (err) {
            // Table already created
        }else{
            
        }
    })  
    }
})


module.exports = db

