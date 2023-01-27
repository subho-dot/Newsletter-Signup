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
    const url ="https://us21.api.mailchimp.com/3.0/lists/01b5bf854e";
    const options = {
        method: "post",
        auth: "subho:898daf618a501036310784fa877c61cb-us2"
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


// API key
// 898daf618a501036310784fa877c61cb-us21

// Audiance ID
// 01b5bf854e
