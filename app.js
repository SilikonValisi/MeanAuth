const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// connecting to db
mongoose.connect(config.database,{useNewUrlParser:true});
// checking the connection
mongoose.connection.on("connected",()=>{
    console.log("Connected to db "+config.database);
});

// checking for error
mongoose.connection.on("error",(err)=>{
    console.log("Error: "+err);
});

const app = express();

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);



// ALL USERS
const users = require("./routes/users");

//PORT NUMBER
const port = 3000;

// CORS (Cross-origin resource sharing) MIDDLEWARE
app.use(cors());

// set static folder(first thing to look for will be the html file in the public folder)
app.use(express.static(path.join(__dirname,"public")));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json());

// DIRECTS (/users/xxx) TO (/routes/users) 
app.use("/users",users);

app.listen(port,() => {
   console.log("SERVER STARTED"); 
});