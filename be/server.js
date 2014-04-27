var express = require('express');
var app = express();

var os = require('os');
// only on linux // for mac, use en0 (or other interfaces)
var ipv4 = os.networkInterfaces().eth0[0].address;

// Dummy DB data
var name = null;


app.use(express.urlencoded());
app.use(express.json());

app.get('/', function(req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");

      // sample data - retrieved from DB
      var data = { "ip": ipv4, "name": name || "not set"};

      // send data 
      res.send(JSON.stringify(data));
});

app.post('/', function(req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      // write sample data to DB
      name = req.body.name;

      // send response 
      res.end(name + " stored successfully.");
});

app.listen(process.env.PORT || 8080);
