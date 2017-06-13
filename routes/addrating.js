var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/imdb');
var session=require('express-session');
var apps=express();
var qs = require('querystring');
apps.use(bodyParser.json());
var fs = require('fs');
var bodyParser = require('body-parser');
var Users=require('../models/users');
var Movies=require('../models/movies');
var rate=require('../models/addrating.js');
var S = require('string');

var path = require('path');
// apps.use(express.static('public'));
apps.use(session({secret: "blekh", resave: false, saveUninitialized: true}));

console,log("lol");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

apps.post('/rate',urlencodedParser,function(req,res,next ){     //adding rating to DB
var moviename=req.body.this.title;
console,log("lolol");
console.log(moviename);

function f1()
{
    console.log("f1");
}

Users.findOne({'email':req.session.name},function(err,docs)
{
    if(err)
    throw(err);
if(docs==NULL)
{
    console.log("no user of this email");
}
Movies.findOne({'title': moviename}, function(err, docs)
{
if(err)
throw(err);

new rate({
            email: req.session.name,
            title: moviename
        }).save(function(err,doc){
            if(err)
            throw(err);
            console.log("insert hogya");
        });

});
});

});
module.exports = router;
