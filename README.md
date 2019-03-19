# ArsNova_tei2json
XML/TEI to JSON Converter for ArsNova Project Digital Edition.

Text nodes are transformed to the following JSON object:
```
{
  text: nodeElement.textContent
}
```
Nodes are transformed to the following JSON object:
```
{
  attributes: [
    {
      name: attribute.name,
      value: attribute.value
    }
  ],
  childNodes: [
    {} // recursive structure
  ]
  tagName: nodeElement.tagName,
  text: nodeElement.textContent
}
```
## Installation
Run `npm i` to install npm dependencies.

## Setup
1. Create **'input'** folder inside the root directory.
2. Store .xml files that need to be converted to JSON in the 'input' folder.
3. Create **'output'** folder inside the root directory.

## Execution
Run `node converter.js` to execute programme.
