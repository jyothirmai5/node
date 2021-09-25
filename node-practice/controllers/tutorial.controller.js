const dbo = require('../db/db-connection');
const dbConnect = dbo.getDb();



const methods = {
  getUsers: (req, res) => {

    dbConnect.collection('users').find({}).toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
  }
}


module.exports = methods;
