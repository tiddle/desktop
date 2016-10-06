var fetch = require('node-fetch');

var API = {
  fetch: function(url) {
    return fetch(url).then(function(res) {
      return res.json();
    }).then(function(json) {
      return json;
    });
  }
};

module.exports = API;