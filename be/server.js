var express = require('express');
var app = express();

// let's use redis
var redis = require("url").parse(process.env.REDIS_URL);
var r = require("redis").createClient(redis.port, redis.hostname);
r.auth(redis.auth.split(":")[1]);

// eth0 is only on linux // for mac, use en0 (or other interfaces)
var os = require('os');
var ipv4 = os.networkInterfaces().eth0[0].address;

app.use(express.urlencoded());
app.use(express.json());

app.get('/', function(req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");

      r.get('name', function(err,name){
        res.send('{ "ip": "'+ipv4+'", "name": "'+ (name || "not set") + '" }');
      });
});

app.post('/', function(req, res) {
      res.setHeader("Access-Control-Allow-Origin", "*");

      r.set('name',req.body.name, function(err){
          res.send(req.body.name + " stored successfully.");
      });
});

app.listen(process.env.PORT || 8080);
