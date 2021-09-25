const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
require('./routes/tutorial.routes')(app);
const db = require('./db/db-connection');
db.connectToServer((err) => {
    console.log('connected to the db')
})
// const config = require('./config/db.config');
// const MongoClient = require('mongodb').MongoClient
// MongoClient.connect(config.url, { useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database');
//         const db = client.db('practice');
//         const usersCollection = db.collection('users');
//         // app.post('/users', (req, res) => {
//         //     usersCollection.insertOne(req.body).then(() => {
//         //         res.send({ message: 'inserted' });
//         //     })
//         // });

//     })
//     .catch(error => console.error(error));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});