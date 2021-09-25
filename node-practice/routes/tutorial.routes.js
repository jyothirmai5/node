const dbo = require('../db/db-connection');
const controller = require('../controllers/tutorial.controller');
var ObjectId = require('mongodb').ObjectId;

module.exports = app => {

    var router = require('express').Router();

    router.post('/students', (req, res) => {
        const dbConnect = dbo.getDb();
        dbConnect.collection("students").insertOne(req.body).then(() => {
            res.status(200).send({ message: 'inserted' });
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while saving student."
                });
            })
    });

    router.get('/students',
        (req, res) => {
            const dbConnect = dbo.getDb();
            if (req.query.search) {
                dbConnect.collection("students").createIndex({ name: "text", type: "text" })
                dbConnect.collection("students").find({ $text: { $search: req.query.search } }).toArray((err, result) => {
                    if (err) {
                        console.log('error', err);
                        res.send("Error fetching listings!");
                    } else {
                        res.json(result);
                    }
                })
            }
            else {
                dbConnect.collection("students").find({}).toArray((err, result) => {
                    if (err) {
                        console.log('error', err);
                        res.send("Error fetching listings!");
                    } else {
                        res.json(result);
                    }
                })
            }

        });

    router.get('/students/:id',
        (req, res) => {
            const dbConnect = dbo.getDb();
            dbConnect.collection("students").find({ _id: new ObjectId(req.params.id) }).toArray((err, result) => {
                if (err) {
                    res.status(400).send("Error fetching listings!");
                } else {
                    res.json(result);
                }
            });
        });

    router.put('/students/:id', (req, res) => {
        const dbConnect = dbo.getDb();
        dbConnect.collection("students").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: req.body
            },
            { upsert: true }
        ).then(() => {
            res.status(200).send({ message: 'updated' });
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while updating student."
                });
            })
    });

    router.delete('/students/:id', (req, res) => {
        const dbConnect = dbo.getDb();
        dbConnect.collection("students").deleteOne(
            { _id: new ObjectId(req.params.id) },
        ).then(() => {
            res.status(200).send({ message: 'deleted' });
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while deleting student."
                });
            })
    });



    app.use('/', router);

}