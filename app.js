var express = require("express");
var app = express(); //returns the instance of express module
//var bodyparser = require("body-parser");
//app.use(bodyparser.urlencoded());
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/muzig";
var cloudUrl = "mongodb+srv://lakshman:lakshman123@jobsday-djpbe.mongodb.net/jobsday";
var albums //= require("./data/albums.json"); //to load albums
app.use("/images", express.static('assets/images'));
app.use("/css", express.static('assets/css'));
app.use("/js", express.static('assets/scripts'));
app.use("/audio", express.static('assets/audio'));
app.set("view engine", "pug");

mongo.connect(cloudUrl, function(er, db){
    if(!er){
        var dbs =  db.db("muzig");
        dbs.collection("albums").find().toArray(function(err, data){
            albums = data;
            console.log(albums)
        })
    }}
);
app.get('/', function(req, resp){
    resp.sendFile(__dirname+"/pages/home.html");
});
app.get('/discover', function(req, resp){
    resp.render("discover",{albums:albums});
});
app.get('/album', function(req, resp){
    console.log(req.query);
    resp.sendFile(__dirname+"/pages/album.html");
});

app.listen(9000, function(){
    console.log("node server is running @ 9000");
});