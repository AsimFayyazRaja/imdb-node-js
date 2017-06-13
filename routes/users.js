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
var rate=require('../models/rating')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//parses input fields from the form
router.get('/signup',urlencodedParser,function (req, res, next) {
    //var messages = req.flash('error');
    res.render('user/signup');
});

var url='mongodb://localhost:27017/imdb';

mongo.connect(url,function(err, db){
assert.equal(null, err);


router.get('/signin',urlencodedParser,function(req,res,next){
res.render('user/signin');
});
router.post('/signin',urlencodedParser,function(req,res,next){
var user={
email: req.body.email,
password: req.body.password
};
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
    console.log(req.session.user);
    Movies.find(function(err,docs)
    {
    if(err)
    {
        throw(err);
    }
    for (var index = 0;index < docs.length;index++) {
        array_movies[index] = {
                description : "blah",
                title : "title",
                image : "image path",
                year : 2017,
                avg: 0,
                id: 0 
            };
            
        }
    for(var c=0;c<docs.length;c++)
    {
        array_movies[c].id=docs[c]._id;
        array_movies[c].title=docs[c].title;
        array_movies[c].year=docs[c].year;
        array_movies[c].description=docs[c].description;
        array_movies[c].image=docs[c].image;
    }

    rate.aggregate([        //getting avg rating of eah movie
        {$group: { _id: "$movieid", avg: { $avg: '$stars' } } }
        ], function(err, result) {
            if(err)
            throw(err);
        var avg=[];
        for(var o=0;o<result.length;o++)
        {
            for(var m=0;m<docs.length;m++)
            {
                console.log((result[o]._id).toString());
                console.log(array_movies[m].id);
                if((result[o]._id).toString()==array_movies[m].id)
                {
                    console.log("aaa");
                    array_movies[m].avg=result[o].avg;
                    console.log(array_movies[m].avg);
                }
            }
        }
        var name=req.session.user;
        res.render('index', {title: 'Imdb',array_movies,name});

});
});
};
});
});
router.post('/signup',urlencodedParser,function(req,res,next)
{
var user={
email: req.body.email,
password: req.body.password
};

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
    db.close();
    console.log(req.session.user);
    Movies.find(function(err,docs)
    {
    //console.log(docs);
    if(err)
    {
        throw(err);
    }
    for (var index = 0;index < docs.length;index++) {
        array_movies[index] = {
                description : "blah",
                title : "title",
                image : "image path",
                year : 2017,
                avg: 0,
                id: 0 
            };
            
        }
    for(var c=0;c<docs.length;c++)
    {
        array_movies[c].id=docs[c]._id;
        array_movies[c].title=docs[c].title;
        array_movies[c].year=docs[c].year;
        array_movies[c].description=docs[c].description;
        array_movies[c].image=docs[c].image;
    }

    rate.aggregate([        //getting avg rating of eah movie
        {$group: { _id: "$movieid", avg: { $avg: '$stars' } } }
        ], function(err, result) {
            if(err)
            throw(err);
        var avg=[];
        for(var o=0;o<result.length;o++)
        {
            for(var m=0;m<docs.length;m++)
            {
                console.log((result[o]._id).toString());
                console.log(array_movies[m].id);
                if((result[o]._id).toString()==array_movies[m].id)
                {
                    console.log("aaa");
                    array_movies[m].avg=result[o].avg;
                    console.log(array_movies[m].avg);
                }
            }
        }
        });   
        var name=req.session.user;
        res.render('index', {title: 'Imdb',array_movies,name});
    });
    //res.render('user/loggedin',{user});
}
});
});
});

module.exports = router;