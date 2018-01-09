var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var campsDB = require("./models/blogs");
var User = require("./models/user");
var seedDB = require("./seed");
var Comment = require("./models/comment");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp",{
  useMongoClient: true,
  /* other options */
});
app.use(express.static(__dirname+"/public"));
console.log(__dirname);
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// var campsSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String
// });

// var campsDB = mongoose.model("campsDB",campsSchema); 
app.get("/",function (req,res) {
    res.render("Home");
});
app.get("/Camps",function (req,res) {
    campsDB.find({},function(error, camps) {
       if(error){
           console.log("error happened");
           console.log(error);
       }
       else{
           res.render("camps/Camps",{camps:camps});
       }
    });
    
});
app.get("/camps/new",function(req, res) {
    res.render("camps/New");
});
app.get("/camps/:id",function(req, res) {
    campsDB.findById(req.params.id).populate("comments").exec(function(error,Thecamp){
        if(error){
        console.log(error);     
        }
        else
        res.render("camps/Show",{camps:Thecamp});
    });
});
app.post("/camps",function(req,res) {
  var name = req.body.name;
  var img = req.body.img;
  var des = req.body.description;
  var camp = {name:name, image:img, description:des};
  campsDB.create(camp, function (error,camps) {
      if(error){
          console.log("error happened");
          console.log(error);
      }
      else{
            res.redirect("/camps");
      }
  });
});
app.get("/camps/:id/comments/new",function(req, res) {
    campsDB.findById(req.params.id, function (error, camps) {
        if (error){
            console.log(error);
        }
        else{
            res.render("comments/New", {camps:camps});
        }
    });

});
app.post("/camps/:id/comments",function (req,res) {
    var text =req.body.comment.text;
    var author=req.body.comment.author;
    campsDB.findById(req.params.id,function(error,Thecamp){
        if(error){
        console.log(error);     
        }
        else
        Comment.create(req.body.comment, function (error,comment) {
            if(error)
            console.log(error);
            else {
            Thecamp.comments.push(comment);
            Thecamp.save();
            res.redirect("/camps/"+req.params.id);
            }
        });
    });
});
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server Started...") ;
});