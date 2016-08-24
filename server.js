var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

    var Item = require('./models/item');

    app.get('/items', function(req, res) {
        Item.find(function(err, items) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.json(items);
        });
    });
    
    app.post('/items', function(req, res) {
        if (!req.body) {
            return res.status(400).json({
                message: 'Internal Server Error'
            });
        }
        if (req.body) {
            Item.findOne({name: req.body.name}, function(err, items) {
                if (err) {
                    console.error('could not read items', items);
                    return res.status(400).json({
                        message: 'Could not read items'
                    });
                } else if (items) {
                    console.log(items, 'item already exists');
                    return res.status(400).json({
                        message: 'Item already exists'
                    });
                }
            });
        }
        Item.create({name: req.body.name}, function(error, item) {
            if (error) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });
    });
    
    app.delete('/items/:id', function(req, res) {
        var id = req.params.id
        Item.findByIdAndRemove(id, function(err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });
    });
    
    app.put('/items/:id', function(req, res) {
        if (req.params.id !== req.body._id) {
            return res.status(400).send();
        } 
        Item.findOne({_id: req.params.id}, function(err, item){
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            item.name = req.body.name;
            item.save(function(err) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.status(201).json(item);
                }
            });
        });
    });
    
    app.use('*', function(req, res) {
        res.status(404).json({
            message: 'Not Found'
        });
    });

exports.app = app;
exports.runServer = runServer;

