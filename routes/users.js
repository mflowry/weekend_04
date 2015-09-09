var express = require('express');
var router = express.Router();
var list = require('../models/list');
var path = require('path');
var fs = require('fs');
var listArray = [];
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 if(req.isAuthenticated()==true){
   var file = path.join(__dirname, '../models/list.json');//create shortcut for path
   fs.readFile(file, 'utf8', function (err, data) {
     if (err) {
       next(err);//next middleware--error handler
     } else {
       listArray = JSON.parse(data);
       console.log(listArray);
       res.render('users', {list: listArray});//return list
     }
   });
   } else {
   res.send("You are not logged in");
 }
});

//post new list item
//$('form').on('click','#submit', function(){
//  router.post('/', function(req, res, next) {
//    console.log("posting");
//    listArray = list;
//    listArray.push(req.body);
//    console.log(listArray);
//
//    var files = path.join(__dirname, '../models/list.json');
//
//    fs.writeFile(files, JSON.stringify(listArray), function (err) {
//      if (err) {
//        console.log(err);
//        res.sendStatus(200).send(err);
//      } else {
//        res.json(listArray);
//      }
//    });
//  });
//});

module.exports = router;

