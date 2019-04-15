class TextService {

  createHTML(node, doc) {
    var tagName = 'span';
    var divs = ['text', 'group', 'front', 'body', 'back', 'div', 'p', 'lg', 'teiHeader']
    if (node.tagName && divs.indexOf(node.tagName) >= 0) {
      tagName = 'div';
    }
    var HTMLElem = doc.createElement(tagName);
    if (node.nodeType === 3) {
      HTMLElem.textContent = node.textContent;
    } else {
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
          HTMLElem.appendChild(this.createHTML(node.childNodes[n], doc));
        };
      }
    }
    return HTMLElem;
  }

}

module.exports = TextService;