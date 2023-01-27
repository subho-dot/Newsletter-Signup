const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/signup.html");
});

app.post("/",function(req,res){
    
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url ="mailchimp url";
    const options = {
        method: "post",
        auth: "subho:API key"
    }

    const request = https.request(url, options, function(response){
        
        if(response.statusCode ==200){
            res.sendFile(__dirname + "/public/success.html");
        }
        else{
            res.sendFile(__dirname + "/public/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});


