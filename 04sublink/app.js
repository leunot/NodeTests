var express = require("express");
var app=express();

app.get("/",function (req,res) {
    res.send("Hi");
});
app.get("/speak/:Petname",function (req,res) {
    if(req.params.Petname === "pig")
    {
     res.send("pig");
    }
    else if(req.params.Petname === "cow"){
        res.send("cow");
    }
    else if(req.params.Petname=== "dog"){
        
        res.send("dog");
    }
});
app.get("/repeat/:Word/:Times",function (req,res) {
    var Word = req.params.Word;
    var Times = req.params.Times;
    var Final ="";
    
    for(var i=0;i<Times;i++){
        Final=Final+" "+Word;
    }
    res.send(Final);
});
app.get("/*",function(req, res) {
    res.send("Page Not Found");
});
app.listen(process.env.PORT,process.env.ip,function () {
    console.log("Server Has Started");
}) 