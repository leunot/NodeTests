var express =require("express");
var app = express();


app.get("/1",function (req,res) {
    res.render("home.ejs");
});

app.listen(process.env.PORT,process.env.ip,function () {
    console.log("Server Has Started");
});