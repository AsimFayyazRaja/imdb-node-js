var express = require('express');
var router = express.Router();
var Users=require('../models/users');
var apps=express();
var qs = require('querystring');
var passport = require('passport');
var bodyParser = require('body-parser');
apps.use(bodyParser.json());
var mongo=require('mongodb');
var assert=require('assert');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('localhost:27017/imdb');
var session=require('express-session');
var Movies=require('../models/movies');
var prep=require('./prepare');
var Watchlist=require('../models/watchlist');
var rate=require('../models/rating');
var prep=require('./prepare');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//parses input fields from the form
router.get('/signup',urlencodedParser,function (req, res, next) {
    //var messages = req.flash('error');
    res.render('user/signup');
});

var name;
var done=false;

var url='mongodb://localhost:27017/imdb';

var userrate=[];


router.get('/logout',function(req,res,next){
req.session.user="";
req.session.password="";

prep.f2(req,res,next);
});


router.get('/profile',function(req,res,next){
    name=req.session.user;
console.log("user ko profile dikhaoji");
console.log(name);
mongo.connect(url,function(err, db){
assert.equal(null, err);

Users.findOne({'email':name},function(err,docs)
{
if(err) throw(err);
console.log(docs);
var id=docs._id.toString();
rate.find({'username':name},function(err,data){
if(err) throw(err);
console.log(data);
console.log("watchlist");
//res.render('user/profile',{data,name});
//console.log(userrate);

Watchlist.find({'username':name},function(err,docs){
if(err) throw(err);
console.log(docs);
res.render('user/profile',{data,name,docs});
//console.log(userrate);
});
});
});

});

});

router.get('/signin',urlencodedParser,function(req,res,next){
res.render('user/signin');
});

router.post('/signin',urlencodedParser,function(req,res,next){
var user={
email: req.body.email,
password: req.body.password
};
mongo.connect(url,function(err, db){
assert.equal(null, err);

Users.findOne({'email':user.email,'password':user.password},function(err,docs){
    var array_movies=[];
if(err)
{
    throw (err);
}
if(docs=="")
{
    console.log("Invalid email or password");
    return(err);
    //throw(err);
}
else if(docs)
{
    console.log("Signed In");
    req.session.user=user.email;
    req.session.password=user.password;
    console.log("welcome ",req.session.user);
    var f1=prep.f2(req,res,next);
}
});
});
});

router.post('/signup',urlencodedParser,function(req,res,next)
{
var user={
email: req.body.email,
password: req.body.password
};
mongo.connect(url,function(err, db){
assert.equal(null, err);

Users.findOne({'email':user.email},function(err,docs){  //finding and iserting user if not found
if(err)
{
    throw (err);
}
else if(docs)
{
    console.log("exists");
    res.render('user/signup',{message:"Email already exists"});
    db.close();
}
else
{
    var array_movies=[];
    console.log("not exists");
    //db.collection('users').insertOne(user, function(err, result){
    new Users({
            email: req.body.email,
            password: req.body.password
        }).save(function(err,doc){
            if(err)
            throw(err);
            console.log("insert hogya");
        });

    assert.equal(null, err);
    req.session.user=user.email;
    console.log("Inserted");
  //  db.close();
    console.log(req.session.user);
    prep.f2(req,res,next);   
}
});
});
});
module.exports = router;