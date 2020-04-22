/**
 * 模块文件
 */
const template = require('art-template');

const schemaRender = template.compile(`{
  "title": "Schema",
  "type": "object",
  "properties": {
    {{each data.items}}
    {{@$value}}
    {{/each}}
  }
}`);

const arrayRender = template.compile(`
  "{{data.title}}": {
    "title": "{{data.title}}",
    "type": "array",
    "items": {
      "title": "{{data.title}}_item",
      "type": "object",
      "properties": {
        {{each data.items}}
        {{@$value}}
        {{/each}}
      }
    }
  },`);

const objectInObjectRender = template.compile(`
"{{data.title}}": {
  "title": "{{data.title}}",
  "type": "object",
  "properties": {
    {{each data.items}}
    {{@$value}}
    {{/each}}
  }
},`);

const objectInArrayRender = template.compile(`
"title": "{{data.title}}",
"type": "object",
"properties": {
  {{each data.items}}
  {{@$value}}
  {{/each}}
},`);

const itemRender = template.compile(`
  "{{data.title}}": {
    "type": "{{data.type}}",
    "title": "{{data.name}}"
    {{if data.needDefault}}
    ,"default": {{@data.defaultValue}}
    {{/if}}
  },`);

  module.exports = {
    schemaRender,
    arrayRender,
    objectInObjectRender,
    objectInArrayRender,
    itemRender,
  }