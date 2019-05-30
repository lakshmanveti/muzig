var Album = require("../models/album.js");

module.exports = {
    findAll: async(req, resp)=>{
        //var albums = await Album.find().exec()
        var albums= Album.find();
        albums.then(function(alb){
            resp.send(alb);
        });
        
    },
    findOne: async(req, resp)=>{
        var album = await Album.findById(req.params.id).exec()
        resp.send(album);
    },
    add: async(req, resp)=>{
        var album = new Album(req.body);
        var res = await album.save();
        resp.send(res);
    },
    update:  async(req, resp)=>{
        var album = await Album.findById(req.params.id).exec();
        album.set(req.body);
        var res = await album.save();
        resp.send(res);
    },
    delete: async(req, resp)=>{
        var res = await Album.deleteOne({_id: req.params.id}).exec();
        resp.send(res);
    }
}