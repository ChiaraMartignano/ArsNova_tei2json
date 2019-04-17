var TextService = require('./textService');

class ModelService {
  
  constructor() {
    this.textService = new TextService();
  }

  createJSON(tei) {
    var model = {};
    // Parse teiHeader
    this.parseTextPart(model, tei, 'teiHeader');
    // Parse texts, divided into front, body and back.
    var texts = tei.getElementsByTagName('text');
    var i = 0;
    if (tei.getElementsByTagName('group')[0] !== null) {
      i++;
    }
    while (i < texts.length) {
      model['text-' + i] = this.parseText(texts[i]);
      i++;
    }
    return model;
  }

  parseText(text) {
    var textObj = {};
    textObj['attributes'] = this.getNodeAttributes(text);
    this.parseTextPart(textObj, text, 'front');
    this.parseTextPart(textObj, text, 'body');
    this.parseTextPart(textObj, text, 'back');
    return textObj;
  }

  parseTextPart(textObj, text, selector) {
    var part = text.getElementsByTagName(selector)[0];
    if (part) {
      textObj[selector] = {
        model: this.convertNodeToJSON(part),
        text: this.textService.createHTML(part)
      }
    }
  }

  getNodeAttributes(node) {
    var attributes = [];
    if (node.attributes && node.attributes.length > 0) {
      for (var i = 0; i < node.attributes.length; i++) {
        attributes.push({ name: node.attributes[i].name, value: node.attributes[i].value });
      }
    }
    return attributes;
  }

  convertNodeToJSON(node) {
    if (node.nodeType !== 3) {
      var nodeObj = {
        tagName: node.tagName,
        attributes: []
      };
      nodeObj.attributes = this.getNodeAttributes(node);
      if (node.childNodes && node.childNodes.length > 0) {
        nodeObj.childNodes = [];
        for (var n = 0; n < node.childNodes.length; n++) {
          var child = this.convertNodeToJSON(node.childNodes[n]);
          if (child) {
            nodeObj.childNodes.push(child);
          }
        };
      }
      return nodeObj;
    }
    return;
  }

}

module.exports = ModelService;