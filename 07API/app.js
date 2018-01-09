var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/",function (req,res) {
    request("http://www.omdbapi.com/?t=california",function(error,respond,body){
        if(!error && respond.statuscode==200){
            res.send(body);
        }
        else
        console.log("Fail");
          res.send(respond.statuscode);
           res.send(error);
    });
});







app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server Started...") ;
});