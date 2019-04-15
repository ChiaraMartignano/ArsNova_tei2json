var fs = require('fs');

var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();
var DOMImplementation = require('xmldom').DOMImplementation;
var domImpl = new DOMImplementation();
var XMLSerializer = require('xmldom').XMLSerializer;
var serializer = new XMLSerializer();
var JSON = require('circular-json');

var TextService = require('./textService');
const textService = new TextService();
var ModelService = require('./modelService');
const modelService = new ModelService();


var convertFile = function(file) {
  fs.readFile('./input/' + file, 'utf8', function(err, data) {
    if (err) { throw err }
    if (data) {
      var dom = parser.parseFromString(data, 'text/xml');
      var tei = dom.getElementsByTagName('TEI')[0];
      var model = modelService.createJSON(tei);
      var htmlDoc = domImpl.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
      var text = textService.createHTML(tei, htmlDoc);
      text = serializer.serializeToString(text);
      var json = {model, text}
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