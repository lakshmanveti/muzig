var mongoose = require("mongoose");

var albumSchema = mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    id:{
        type: Number,
        require:false
    },
    artists:{
        type: String,
        require:true
    },
    thumb:{
        type: String,
        require:true
    },
});

albumSchema.pre("save", function(){
   // console.log("before save");
    this.title = this.title.toUpperCase();
});
albumSchema.post("save", function(){
   /// console.log("after save");
});

albumSchema.pre("find", function(){
  //  console.log("before find");
});
albumSchema.post("find", function(){
   // console.log("after find");
});

var Album = mongoose.model("albums", albumSchema);

module.exports = Album;