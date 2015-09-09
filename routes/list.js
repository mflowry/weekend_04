var express = require('express');
var router = express.Router();
var path = require('path');
var list = require('../models/list.json');
var fs = require('fs');
var listArray = [];

/* GET student listing. */
router.get('/', function(req, res) {
    console.log("getting");
    var file = path.join(__dirname, '../models/list.json');//create shortcut for path
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            next(err);//next middleware--error handler
        } else {
            listArray = JSON.parse(data);
            console.log(listArray);
            res.json(list);//return student list
        }
    });
});
//post new student information to students.json
//I believe the Ajax post request in public/../app.js uses this router to post

router.post('/', function(req, res, next) {
    console.log("posting");
    listArray = list;
    listArray.push(req.body);
    console.log(listArray);

    var files = path.join(__dirname, '../models/list.json');

    fs.writeFile(files, JSON.stringify(listArray), function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(200).send(err);
        } else {
            res.json(listArray);
        }
    });
});

module.exports = router;
