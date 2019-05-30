var express = require("express");
var app = express();

var user = require("../controllers/user");

app.post("/register", user.add);
app.post("/auth", user.auth);
app.post("/upload/:id", user.uploadThum);


module.exports = app;