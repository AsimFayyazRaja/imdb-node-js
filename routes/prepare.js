var express = require('express');
var router = express.Router();
var User=require('../models/users');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/imdb');
var session=require('express-session');
var Movies=require('../models/movies');
var rate=require('../models/rating');

var apps=express();
var path = require('path');

apps.use(session({secret: "blekh", resave: false, saveUninitialized: true}));

function f1()
{
    console.log("in f1");
}

function preparing(req, res, callback)
{
Movies.find(function(err,docs1)
{
    //console.log(docs);
    if(err)
    {
        throw(err);
    }
});

    rate.aggregate([        //getting avg rating of eah movie
        {$group: { _id: "$title", avg: { $avg: '$rate.stars' } } }
        ], function(err, result) {
            console.log(result);
            res.render('index', {title: 'Imdb',docs1,name,result});
            db.close();
});
        



}
 module.exports = router;









