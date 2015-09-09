var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports=mongoose.model('User',UserSchema);
//var express = require('express');
//var router = express.Router();
//var path = require('path');
//var list = require('../models/list.json');
//var fs = require('fs');
//var listArray = [];
//
///* GET user page. */
//router.get('/users', function(req, res) {
//    console.log("getting");
//    var file = path.join(__dirname, '../models/list.json');//create shortcut for path
//    fs.readFile(file, 'utf8', function (err, data) {
//        if (err) {
//            next(err);//next middleware--error handler
//        } else {
//            listArray = JSON.parse(data);
//            console.log(listArray);
//            res.render('users', {"title":title, "rating":rating, "runtime": runtime });//return list
//        }
//    });
//});
////post new list item
//router.post('/', function(req, res, next) {
//    console.log("posting");
//    listArray = list;
//    listArray.push(req.body);
//    console.log(listArray);
//
//    var files = path.join(__dirname, '../models/list.json');
//
//    fs.writeFile(files, JSON.stringify(listArray), function (err) {
//        if (err) {
//            console.log(err);
//            res.sendStatus(200).send(err);
//        } else {
//            res.json(listArray);
//        }
//    });
//});
//module.exports = router;

//router.get('/', function(req, res) {
//    console.log("getting");
//    var file = path.join(__dirname, '../models/students.json');//create shortcut for path
//    fs.readFile(file, 'utf8', function (err, data) {
//        if (err) {
//            next(err);//next middleware--error handler
//        } else {
//            studentArray = JSON.parse(data);
//            console.log(studentArray);
//            res.json(students);//return student list
//        }
//    });
//});