var express = require('express')
var moment = require('moment');

var app = express();
var natLang = /(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d\d?).+?(\d\d\d\d)/;
var unixTime = /\d\d\d\d\d\d\d\d\d\d/;


var port = process.env.PORT || 8080;


app.get('/$', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:date', function (req, res) {
  var obj = {};
  var unix = null;
  var natural = null;
  var param = req.params.date;

  if (natLang.test(param)) {
    natural = param;
    unix = moment.utc(param, "MMMM D, YYYY").format("X");
  }

  if (unixTime.test(param)) {
    var temp = moment.utc(param, "X");

    natural = temp.format("MMMM D, YYYY");
    unix = temp.format("X");
  }

  res.json({
    "unix": unix,
    "natural": natural
  });
})



app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})