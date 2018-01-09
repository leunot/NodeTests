var express = require("express");
var app = express();
var bodyparser = require("body-parser");

var friends = ["meti","kusha","Lu"];

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
   res.render("home"); 
});
app.get("/friends",function(req,res){
    
    res.render("friends",{friends:friends});
});
app.post("/addfriend",function(req,res){
    friends.push(req.body.Add);
    res.redirect("/friends");
});
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server Started...") ;
});