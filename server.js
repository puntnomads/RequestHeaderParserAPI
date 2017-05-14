var express = require("express");
var app = express();
var Negotiator = require('negotiator');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/api/whoami/', function (req, res) {
  var ipaddress = req.headers['x-forwarded-for'] || req.ip;
  if (ipaddress.substr(0, 7) == "::ffff:") {
    ipaddress = ipaddress.substr(7);
  }
  var negotiator = new Negotiator(req);
  var language = negotiator.language();
  var regExp = /\(([^)]+)\)/;
  var matches = regExp.exec(req.headers['user-agent']);
  var software = matches[1];
  var object = { ipaddress: ipaddress, language: language, software: software };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(object));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});