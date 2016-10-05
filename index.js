var restify = require('restify');
var config = require('./config/my.config.js');

function getForecast() {
  var client = restify.createClient({
    url: url
  });

  var weatherUrl = '/api/'+config.wunderground.api+'/forecast/q/'+config.wunderground.closestWeatherStation+'.json';
  client.get(weatherUrl, function (err, request) {
    request.on('result', function (err, response) {
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

function getForecast10day(req, res) {
  var client = restify.createClient({
    url: 'http://api.wunderground.com',
  });

  var weatherUrl = '/api/'+config.wunderground.api+'/forecast10day/q/'+config.wunderground.closestWeatherStation+'.json';
  client.get(weatherUrl, function (err, request) {
    request.on('result', function (err, response) {
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

  var url = '/maps/api/directions/json?origin='+encodeURI(config.google.from)+'&destination='+encodeURI(config.google.to)+'&traffic_modal=pessimistic&key='+config.google.api;
  client.get(url, function (err, request) {
   request.on('result', function(err, response) {
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
server.get('/weather/10day', getForecast10day);
server.get('/weather/forecast', getForecast);
server.get('/directions/dulux', getDirectionsForDulux);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});