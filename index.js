var PORT = 80;

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');
var AWS = require('aws-sdk');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

AWS.config.update({
    region: 'us-east-1',
});

var DB = new AWS.DynamoDB.DocumentClient();

app.get('/v1/notes', function(req, res) {
    var params = {
        TableName: "demotable"
    };

    DB.scan(params, function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(data);
            console.log("fetched notes");
            res.status(200).send(data);
        }
    })
});

app.post('/v1/notes', function(req, res) {
    console.log('post note called');
    console.log(req.body);
    console.log(req.body.noteBody);
    var reqId = uuid.v4();
    var time = new Date().toString(); // current time in form of a string
    var params = {
        TableName: "demotable",
        Item: {
            "uuid": reqId,
            "date": time,
            "title": req.body.noteTitle,
            "body": req.body.noteBody
        }
    };

    DB.put(params, function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log("Put note " + req.body.noteTitle + " into DB");
            res.status(200).send(data);
        }
    });
});


app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});
