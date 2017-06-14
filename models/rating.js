var mongoose=require('mongoose');

var Schema = mongoose.Schema;

//mongoose.connect('localhost:27017/imdb');

var schema= new Schema(
    {
    stars:{type: Number, required: true},
    moviename:{type: String, require: true},
    username:{type: String, require: true}
});


module.exports=mongoose.model('ratings', schema);