class ModelService {

  createJSON(node) {
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
          nodeObj.childNodes.push(this.createJSON(node.childNodes[n]));
        };
      }
    }
    return nodeObj;
  }

}

module.exports = ModelService;