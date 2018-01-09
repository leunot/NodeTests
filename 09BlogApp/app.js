var express = require("express"),
    app= express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

app.get("/blogs",function(req,res){
    Blog.find({},function (error,Blog) {
        if(error){
            console.log(error);
        }
        else
          res.render("index",{Blogs:Blog});
    });
});
app.get("/",function (req,res) {
    res.redirect("/blogs");
});
app.get("/blogs/new",function(req, res) {
    res.render("new");
});
app.post("/blogs",function (req, res) {
   req.body.blog.body = req.sanitize(req.body.blog.body);
   var title =req.body.blog.title;
   var image =req.body.blog.image;
   var body = req.body.blog.body;
   var blog ={title:title,image:image,body:body};
   Blog.create(blog,function (error,newblog) {
       if(error){
           console.log(error);
       }
       else{
           res.redirect("/blogs");
       }
   });
});
app.get("/blogs/:id",function(req, res) {
   Blog.findById(req.params.id,function (error, FoundBlog) {
      if(error){
          console.log(error); 
      }
      else{
          res.render("show",{blog: FoundBlog});
      }
   });
});
app.get("/blogs/:id/edit", function(req, res) {
   Blog.findById(req.params.id, function(error, newBlog) {
      if(error){
          console.log(error);
      }
      else{
          res.render("edit",{blog:newBlog});
      }
   });
});
app.put("/blogs/:id",function (req,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function (error,newblog) {
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});
app.delete("/blogs/:id",function (req,res) {
    Blog.findByIdAndRemove(req.params.id,function (error,newblog) {
        if(error){
            console.log(error);
        }
        else{
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server Started...") ;
});