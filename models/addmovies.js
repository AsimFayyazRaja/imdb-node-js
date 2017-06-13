var Movies=require('../models/movies');

var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/imdb');


var movie= [ 
    new Movies({
    image: 'http://68.media.tumblr.com/41a0e3c8a338244ebfe5b7a2615b23cc/tumblr_mg7w8tvyN51ryu4tko1_500.jpg',
    title: 'Shawshank Redemption',
    description: "A masterclass from Morgan Freeman. THE BEST MOVIE EVER.",
    year: 1996
}),

new Movies({
    image: 'https://media0.giphy.com/media/m6OomwWCojfS8/giphy.gif',
    title: 'Minions',
    description: "Minions are cute and this movie is fun.",
    year: 2015
}),

new Movies({
    image: 'http://68.media.tumblr.com/c2c503def74ac82a19937c82eb1faab2/tumblr_nnba4wixlB1sjsltxo1_250.png',
    title: 'Furious8',
    description: "Fast8 is overrated and weird movie.",
    year: 2017
}),

new Movies({
    image: 'http://68.media.tumblr.com/c0f181eb1ea3995f7997f2fc431632a6/tumblr_omt2zqvsMx1qb1vnmo1_1280.jpg',
    title: 'john Wick2',
    description: "John Wick2 is the sequeal of John Wick. It is a thrilling movie.",
    year: 2017
})

];
//array of prods and populated them

var done=0;

for(var i=0;i<movie.length;i++)
{
    movie[i].save(function(err,result){
        if(err)
        {
            console.log("Error in inserting movie in db");
            console.log(err.message);
        }
        done++;
        if(done==movie.length){
        exit();    
        }     //saving to db
});

}

function exit()
{
    mongoose.disconnect();
}