var User = require("../models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

 module.exports ={
    add : async(request, response)=>{
        var user = new User(request.body);
        var res = await user.save();
        response.send(res);
    },
    auth: async(request, response)=>{
      var _res = {success: false, msg: "user is invalid"};
      var user = await User.findOne({email:request.body.email}).exec();
      console.log(request.body)
      if(user && bcrypt.compareSync(request.body.password, user.password)){
         const token = jwt.sign({email: user.email}, request.app.get("secretKey"), {expiresIn: '1h'});
        _res.success = true;
        _res.msg = "valid user";
        _res.token = token;
      }
      response.send(_res);
    },
    uploadThum: async(request, response)=>{
      var _res = {success: false, msg: "No file attachment"};
      if(!request.hasOwnProperty("files")){
        response.send(_res);
      }
      var file = request.files.pic;
      var fileUploadSts = file.mv(`./data/${request.params.id}.jpg`);
      var user = await User.findById(request.params.id).exec();
      user.set({"thumb": request.params.id+".jpg"});
      var res = await user.save();
      response.send(res);
    }

 }