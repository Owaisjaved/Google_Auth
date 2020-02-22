const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//const Model=mongoose.model;
const userSchema=new Schema({
    username:String,
    googleID:String,
    thumbnail:String
});
//1st parameter=collection name 2nd parameter is schema
const User=mongoose.model('user', userSchema);

module.exports=User