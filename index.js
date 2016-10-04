var restify = require('restify');
var http = require('http');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

function getForecast(req, res) {
  client = restify.createClient({
    url: 'http://api.wunderground.com',
  });

  client.get('/api/6374df36c9e7e429/forecast/q/zmw:00000.1.95864.json', function (err, request) {
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

var server = restify.createServer();
server.get('/weather/10day', getForecast);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});