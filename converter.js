var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();
var JSON = require('circular-json');

var parseNode = function(node) {
  var nodeObj;
  if (node.nodeType === 3) {
    nodeObj = {
      text: node.textContent
    };
  } else {
    nodeObj = {
      tagName: node.tagName,
      attributes: []
    };
    if (node.attributes && node.attributes.length > 0) {
      for (var i = 0; i < node.attributes.length; i++) {
        nodeObj.attributes.push({ name: node.attributes[i].name, value: node.attributes[i].value });
      }
    }
    if (!node.childNodes || node.childNodes.length < 1) {
      nodeObj.text = node.textContent;
    } else {
      nodeObj.childNodes = [];
      for (var n = 0; n < node.childNodes.length; n++) {
        nodeObj.childNodes.push(parseNode(node.childNodes[n]));
      };
    }
  }
  return nodeObj;
}


var convertFile = function(file) {
  fs.readFile('./input/' + file, 'utf8', function(err, data) {
    if (err) { throw err }
    if (data) {
      var dom = parser.parseFromString(data, 'text/xml');
      var text = dom.getElementsByTagName('text')[0];
      var json = parseNode(text);
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