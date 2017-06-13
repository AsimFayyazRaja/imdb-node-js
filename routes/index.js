var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
var mongo=require('mongodb')
mongoose.Promise = global.Promise;
//mongoose.connect('localhost:27017/imdb');
var session=require('express-session');

var rate=require('../models/rating');

var fs = require('fs');
var Movies=require('../models/movies');
var Users=require('../models/users');
var Watchlist=require('../models/watchlist');
var S = require('string');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var assert=require('assert');
var apps=express();
var path = require('path');
// apps.use(express.static('public'));
apps.use(session({secret: "blekh", resave: false, saveUninitialized: true}));
// apps.use('/',express.static(_dirname + '/public'));

//req.session.user=user;
var prep=require('./prepare');
var chunkSize=2;
var moviearr=[];

var array_movies = [];

  var url='mongodb://localhost:27017/imdb';

router.post('/addrating:idm',urlencodedParser,function(req,res,next)
{ 
mongo.connect(url,function(err, db){
assert.equal(null, err);

console.log("aao rate karien");
var Movieid=req.params.idm;
console.log(Movieid);
var name=req.session.user;
console.log(req.body.rating);
var uid;
Users.findOne({'email':name},function(err,docs)
{
if(err) throw(err);

if(docs==null)
{
    console.log("No user");
    next();
}
else
{
uid=docs._id.toString();
new rate({
            movieid: Movieid,
            userid: uid,
            stars: req.body.rating
        }).save(function(err,doc){
            if(err)
            throw(err);
            console.log("insert hogya");
        });
    assert.equal(null, err);
    //req.session.user=user.email;
    console.log("Inserted");
    db.close();
    res.redirect('/');
}
});
});
});



router.get('/rate-movie:idm', function(req,res,next)
{
    var movie= {
                description : "blah",
                title : "title",
                image : "image path",
                year : 2017,
                avg: 0,
                id: 0 
            };
    var movieid=req.params.idm;
    var name=req.session.user;
    console.log(name);
   console.log(movieid);
    console.log("aagya kabu");
    Movies.findOne({'_id':movieid},function(err,docs){
        if(err)
        throw(err);
        movie.description=docs.description;
        movie.title=docs.title;
        movie.year=docs.year;
        movie.id=(docs._id).toString();
        movie.image=docs.image;
    rate.aggregate([        //getting avg rating of eah movie
        {$group: { _id: "$movieid", avg: { $avg: '$stars' } } }
        ], function(err, result) {
            if(err)
            throw(err);
            for(var p=0;p<result.length;p++)
            {
                if((result[p]._id).toString()==movie.id)
                {
                    movie.avg=result[p].avg;
                    break;
                }
            }
            res.render('rate',{movie,name});
        });
});
});

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
        {$group: { _id: "$movieid", avg: { $avg: '$stars' } } }
        ], function(err, result) {
            if(err)
            throw(err);
            //console.log(result);
            //res.render('index', {title: 'Imdb',docs1,name,result});
            //db.close();
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
    router.get('/', function(req, res, next) {
        var name=req.session.user;
        Movies.find(function(err,docs)
        {
            //console.log(docs);
            if(err)
            {
                throw(err);
            }
                //console.log(result);
                console.log(name);
                res.render('index', {title: 'Imdb',array_movies,name});
        });
    });
        });
});

router.get('/:idm', function(req,res,next){
var name=req.session.user;
var movieid=req.params.idm;

console.log(movieid);
console.log(name);

mongo.connect(url,function(err, db){
assert.equal(null, err);

console.log("ao wishlist mein dalien");


db.collection("watchlist", function(error, collection){
        console.log(error);
        collection.insert({
            moviename: movieid,
            username: name
        }, function(){
                console.log("Successfully inserted")
        });
});

    assert.equal(null, err);
    //req.session.user=user.email;
    //console.log("Inserted");
    db.close();
    res.render('index', {title: 'Imdb',array_movies,name});
});

});
            /*    Movies.find({},'description',function(err,data){
        if(err)
        {
            throw(err);
        }
        console.log(data);
        
        for(var j=0;j<data.length;j++)
        {
            des[j]=data[j];
            x=data[j].toString().length;
            x=x-19;
            desc[j]=des[j].toString().substr(16,x);
            
            var y=(path.join(__dirname, '', desc[j]));
            console.log(y);
            
            var dt=[];
            fs.readFile(y,"utf8",function(err,data){
                if(err){
                    console.log(err.Status, err.message);
                }
                else{
                    console.log(data);
                    moviedescrip[j]=data.toString();
                    console.log(moviedescrip[j]);
                   // array_movies[j].description=moviedescrip[j];
                    //moviedescrip[j]=data;
                    //console.log(array_movies[j].description);
                }
                
            })
            //console.log(desc[j]);
        }   //desc now has pure relative address for images
        
    }).select('description -_id');
    
    for(var j=0;j<docs.length;j++)
    {
        console.log(moviedescrip[j]);
    }

    Movies.find({},'image',function(err,data){
        if(err)
        {
            throw(err);
        }
        
        //getting image path
        for(var j=0;j<data.length;j++)
        {
            var imagedir='../public/images/';
            im[j]=data[j];
            x=data[j].toString().length;
            x=x-12;
            img[j]=im[j].toString().substr(10,x-1);
            
            z=imagedir+img[j];
            
            //console.log(z, "zz");
            img[j]=z;
            array_movies[j].image=z;
            console.log(array_movies[j].image);
        }
        //desc now has pure relative address for images
        
    }).select('image -_id');
    /* GET home page. */
    
  
        //console.log(array_movies);
        
        // movie[0].description="ww";
        
        // console.log(movie[0].description);
        
        module.exports = router;
        
        