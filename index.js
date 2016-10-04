var restify = require('restify');
var config = require('./config/default.config.js');
console.log(config);

function getForecast(req, res) {
  var client = restify.createClient({
    url: 'http://api.wunderground.com',
  });

  client.get('/api/'+config.wunderground.api+'/forecast/q/'+config.wunderground.closestWeatherStation+'.json', function (err, request) {
    request.on('result', function (err, response) {
      console.log(err);
      response.body = '';
      response.on('data', function (chunk) {
        response.body += chunk;
      });

      response.on('end', function () {
        res.send(JSON.parse(response.body));
      });
    });
  });
}

function getDirectionsForDulux(req, res) {
  var client = restify.createClient({
    url: 'https://maps.googleapis.com',
  });

  client.get('/maps/api/directions/json?origin='+config.google.from+'&destination='+config.google.to+'&traffic_modal=pessimistic&key='+config.google.api, function (err, request) {
   request.on('result', function(err, response) {
     console.log(err);
     response.body = '';
     response.on('data', function(chunk) {
       response.body += chunk;
     });

     response.on('end', function() {
       res.send(JSON.parse(response.body));
     });
   })
  })
}

var server = restify.createServer();
server.get('/weather/10day', getForecast);
server.get('/directions/dulux', getDirectionsForDulux);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});