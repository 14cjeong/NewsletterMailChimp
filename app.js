//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
//Something new we learned. Allows use of CSS and Image which are static.

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  console.log(firstName, lastName, email);
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  var jsonDATA = JSON.stringify(data);
  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/d57388206b",
    method: "POST",
    headers: {
      "Authorization": "chang1 f4e6bf1c56115a8f022687ca8fad74fd-us20"
    },
    body: jsonDATA
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    }
  });
});


app.post("/failure", function(req, res){
  res.redirect("/");

});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running on port 3000!");
});


