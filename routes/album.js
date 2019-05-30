var express = require("express");
var app = express();
var album = require("../controllers/album.js")

app.get("/", album.findAll);

app.get("/:id", album.findOne);

app.post("/", album.add);

app.put("/:id", album.update);

app.delete("/:id", album.delete);

module.exports = app;