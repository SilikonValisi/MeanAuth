var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var config = require("../config/database"); 

// user Schema

var userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// we define our model and export it.First argument is the name of the collection it will become plural by default
var User = module.exports= mongoose.model("User",userSchema);

// exporting the getUserById so we can call it from outside
module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}
// this way we can use the callback where we want it , which is in findOne:
//we call the getUserByUsername like this = getUserByUsername(username,function(err,user){
//     ...
// }); i guess
module.exports.getUserByUsername = function(username,callback){
    const query = {username: username};
    User.findOne(query,callback); 
}
// exporting the addUser so we can call it from outside
module.exports.addUser = function(newUser,callback){
    // 
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}