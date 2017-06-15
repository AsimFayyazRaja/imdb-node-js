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


 module.exports = {
     //router,
     //prep,
     //test,
     f2:function(req,res,next)
     {
         var array_movies=[];
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
       //console.log(array_movies[c].title,array_movies[c].year,array_movies[c].image,array_movies[c].description);
    }
  
  rate.aggregate([        //getting avg rating of eah movie
        {$group: { _id: "$moviename", avg: { $avg: '$stars' } } }
        ], function(err, result) {
            if(err)
            throw(err);
            //console.log(result);
            //res.render('index', {title: 'Imdb',docs1,name,result});
            //db.close();
console.log(result);
var avg=[];
for(var o=0;o<result.length;o++)
{
    for(var m=0;m<docs.length;m++)
    {
        console.log((result[o]._id).toString());
        console.log(array_movies[m].id);
        if((result[o]._id).toString()==array_movies[m].title)
        {
            console.log("aaa");
            array_movies[m].avg=result[o].avg;
            array_movies[m].avg = Math.round( array_movies[m].avg * 10 ) / 10;
            console.log(array_movies[m].avg);
        }
    }
}           var name=req.session.user;
               console.log(name);
                res.render('index', {title: 'Imdb',array_movies,name});
        });
    });


     }
 };









