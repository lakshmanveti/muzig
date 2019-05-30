var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var saltRounds = 10;
var userSchema = mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    id:{
        type: Number,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    thumb:{
        type: String,
        require:false
    }
});

userSchema.pre("save", function(){
    this.password = bcrypt.hashSync(this.password, saltRounds);
});

var User = mongoose.model("musers", userSchema);

module.exports = User;