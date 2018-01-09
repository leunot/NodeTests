var mongoose = require("mongoose");
var campsDB = require("./models/blogs");
var Comment = require("./models/comment");
var data = [
    {
        name: "Some Park",
        image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Beach Camp",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Mauntain Camp",
        image: "https://farm8.staticflickr.com/7268/7121859753_e7f787dc42.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    ];
function seedDB() {
Comment.remove({},function (error) {
    if(error)
    console.log(error);
});
campsDB.remove({}, function(error){
        if(error){
            console.log(error);
        }
        console.log("removed campgrounds!");
            data.forEach(function(seed) {
                campsDB.create(seed,function (argument, camp) {
                    if(argument)
                    console.log(argument);
                    else {
                    console.log("Camp Added");
                    Comment.create(
                        {
                            text: "This Place is Great",
                            author: "Jack"
                        }, function(error, comment){
                            if (error){
                            console.log(error);
                            }
                            else {
                            camp.comments.push(comment);
                            camp.save();
                            console.log("Created new Comment");
                            }
                        });
                        
                    }
                });
            
        });
    });


}
module.exports = seedDB; 