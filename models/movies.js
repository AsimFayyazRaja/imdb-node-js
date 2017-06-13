var mongoose=require('mongoose');
var Schema = mongoose.Schema;

/*mongoose.connect('localhost:27017/imdb', function(err)
{
    if(err)
    throw(err);
});
*/
var schema= new Schema(
    {
    title:{type: String, required: true},
    year: {type: Number, required: true},
   description:{type: String, required: true},
   image: {type: String, required: true} 
});

module.exports=mongoose.model('movies', schema);