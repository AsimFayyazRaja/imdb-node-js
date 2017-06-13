var rate=require('../models/rating');

var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/imdb');


var Rate= [ 
    new rate({
    //image: 'http://68.media.tumblr.com/41a0e3c8a338244ebfe5b7a2615b23cc/tumblr_mg7w8tvyN51ryu4tko1_500.jpg',
    movieid: '593d847b03506d10be8c76ea',
    //description: "A masterclass from Morgan Freeman. THE BEST MOVIE EVER.",
    //year: 1996
    userid:'593da35ddb37ee25e45c22cc',
    stars:6
}),

new rate({
    //image: 'http://68.media.tumblr.com/41a0e3c8a338244ebfe5b7a2615b23cc/tumblr_mg7w8tvyN51ryu4tko1_500.jpg',
    movieid: '593d847b03506d10be8c76eb',
    //description: "A masterclass from Morgan Freeman. THE BEST MOVIE EVER.",
    //year: 1996
    userid:'593da35ddb37ee25e45c22cc',
    stars:9
}),
new rate({
    //image: 'http://68.media.tumblr.com/41a0e3c8a338244ebfe5b7a2615b23cc/tumblr_mg7w8tvyN51ryu4tko1_500.jpg',
    movieid: '593d847b03506d10be8c76ea',
    //description: "A masterclass from Morgan Freeman. THE BEST MOVIE EVER.",
    //year: 1996
    userid:'593da35ddb37ee25e45c22cc',
    stars:10
})
];
//array of prods and populated them

var done=0;

for(var i=0;i<Rate.length;i++)
{
    Rate[i].save(function(err,result){
        if(err)
        {
            console.log("Error in inserting movie in db");
            console.log(err.message);
        }
        done++;
        if(done==Rate.length){
            console.log("Inserted");
        exit();    
        }     //saving to db
});

}

function exit()
{
    mongoose.disconnect();
}