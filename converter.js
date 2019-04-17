var fs = require('fs');

var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();

var JSON = require('circular-json');

var ModelService = require('./modelService');
const modelService = new ModelService();


var convertFile = function(file) {
  fs.readFile('./input/' + file, 'utf8', function(err, data) {
    if (err) { throw err }
    if (data) {
      var dom = parser.parseFromString(data, 'text/xml');
      var tei = dom.getElementsByTagName('TEI')[0];
      var json = modelService.createJSON(tei);
      var jsonString = JSON.stringify(json);
      var fileName = file.replace('.xml', '.json');
      fs.writeFile('./output/' + fileName, jsonString, function(err) {
        if (err) { throw err }
      })
    }
  })
}

fs.readdir('./input', {encoding: 'utf8', withFileTypes: true}, function(err, files) {
  if (err) { throw err }
  files.map(function(file) {
    convertFile(file);
  })
})