var config = require('./config/my.config.js');
var restify = require('restify');
var api = require ('./services/ApiService.js');

function getForecast(req, res) {
  var weatherUrl = 'http://api.wunderground.com/api/'+config.wunderground.api+'/forecast/q/'+config.wunderground.closestWeatherStation+'.json';
  return api.fetch(weatherUrl).then(function(weatherData) {
    res.send(weatherData);
    return weatherData;
  })
}

function getForecast10day(req, res) {
  var weatherUrl = 'http://api.wunderground.com/api/'+config.wunderground.api+'/forecast10day/q/'+config.wunderground.closestWeatherStation+'.json';
  return api.fetch(weatherUrl).then(function(weatherData) {
    res.send(weatherData);
    return weatherData;
  });
}

function getDirectionsForDulux(req, res) {
  var directionUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin='+encodeURI(config.google.from)+'&destination='+encodeURI(config.google.to)+'&traffic_modal=pessimistic&key='+config.google.api;
  return api.fetch(directionUrl).then(function(directionData) {
    res.send(directionData);
    return directionData;
  });
}

var server = restify.createServer();
server.get('/weather/10day', getForecast10day);
server.get('/weather/forecast', getForecast);
server.get('/directions/dulux', getDirectionsForDulux);

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});