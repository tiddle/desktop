var restify = require('restify');

function getForecast(req, res) {
  var client = restify.createClient({
    url: 'http://api.wunderground.com',
  });

  client.get('/api/6374df36c9e7e429/forecast/q/zmw:00000.1.95864.json', function (err, request) {
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

  client.get('', function (err, request) {
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