var DOMImplementation = require('xmldom').DOMImplementation;
var XMLSerializer = require('xmldom').XMLSerializer;

class TextService {

  constructor() {
    this.domImpl = new DOMImplementation();
    this.serializer = new XMLSerializer();
  }

  createHTML(node) {
    var htmlDoc = this.domImpl.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    var htmlString = this.convertNodeToHTML(node, htmlDoc);
    htmlString = this.serializer.serializeToString(htmlString);
    return htmlString;
  }

  convertNodeToHTML(node, doc) {
    if (node.nodeType === 3) {
      return doc.createTextNode(node.textContent);
    } else {
      var tagName = 'span';
      var divs = ['text', 'group', 'front', 'body', 'back', 'div', 'p', 'lg', 'teiHeader']
      if (node.tagName && divs.indexOf(node.tagName) >= 0) {
        tagName = 'div';
      }
      var HTMLElem = doc.createElement(tagName);
      HTMLElem.setAttribute('class', node.tagName);
      if (node.attributes && node.attributes.length > 0) {
        for (var i = 0; i < node.attributes.length; i++) {
          if (node.attributes[i].name === 'xml:id') {
            HTMLElem.setAttribute('id', node.attributes[i].value);
          } else {
            HTMLElem.setAttribute('data-' + node.attributes[i].name, node.attributes[i].value);
          }
        }
      }
      if (!node.childNodes || node.childNodes.length < 1) {
        HTMLElem.textContent = node.textContent;
      } else {
        for (var n = 0; n < node.childNodes.length; n++) {
          HTMLElem.appendChild(this.convertNodeToHTML(node.childNodes[n], doc));
        };
      }
      return HTMLElem;
    }
  }

}

module.exports = TextService;