const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req, res){

  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){


  const firstName = req.body.Fname ;
  const lastName = req.body.Lname ;
  const mailAddress = req.body.Mail ;

  const data = {
    members: [
      {
        email_address: mailAddress ,
        status: "subscribed" ,
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/c68f4b6d73";

  const options = {
    method : "POST",
    auth : "abhishek5:05ced8bc0fff2100c057d790ee1f8234-us6"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }



    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();


});


app.post("/failure", function(req, res){
  res.redirect("/");
})






app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})





// API KEY
 // 05ced8bc0fff2100c057d790ee1f8234-us6

 // list ID
 // c68f4b6d73
