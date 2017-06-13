var mongoose=require('mongoose');

var Schema = mongoose.Schema;

//mongoose.connect('localhost:27017/imdb');

var schema= new Schema(
    {
    stars:{type: Number, required: true},
    movieid:[
      {type: Schema.Types.ObjectId, ref: 'movies'}
    ],
    userid:[
      {type: Schema.Types.ObjectId, ref: 'users'}
    ] 
});


module.exports=mongoose.model('ratings', schema);