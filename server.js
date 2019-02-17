// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// parse timestamp
app.get("/api/timestamp/:date_string?", function(req, res){
  const { date_string } = req.params;
  let date;
  
  if (date_string) {
    if (/\D/.test(date_string)) {         // if date_string contains non-digit characters,
      date = new Date(date_string);       // parse it as a date string
    }
    else {
      const ms = parseInt(date_string);   // otherwise parse it as an integer in milliseconds
      date = new Date(ms);
    }
  }
  else {
    date = new Date();                    // if no date_string provided, use current time
  }
  
  (!date.valueOf())                       // if the value of the date is falsy (NaN), it's an invalid date
  ?  res.json({"error" : "Invalid Date" })
  :  res.json({ "unix": date.getTime(), "utc" : date.toUTCString() });
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});