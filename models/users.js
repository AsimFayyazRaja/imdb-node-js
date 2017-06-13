var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect('localhost:27017/imdb');



var schema= new Schema(
    {
    email:{type: String, required: true},
    password: {type: String, required: true}
});

module.exports=mongoose.model('users', schema);