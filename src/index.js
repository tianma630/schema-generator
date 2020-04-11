#! /usr/bin/env node

var fs = require('fs-extra');
var program = require('commander');
var schemaGenerator = require('./ergodic');
var deepAssign =  require('./deep-assign');

program
  .version('0.1.0')
  .option('-m, --mock <mock>', 'mock文件')
  .option('-s, --schema <schema>', 'schema文件')
  .option('-t, --title', '是否自动映射标题')
  .option('-d, --default', '是否需要默认值')
  .parse(process.argv);

const { mock, schema } = program;
const needTitle = program.title;
const needDefault = program.default;

console.log(`
  mock文件: ${mock};
  schema文件: ${schema};
  是否自动映射标题: ${needTitle ? true: false};
  是否需要默认值: ${needDefault ? true: false};
`);

if (!mock) {
  console.log('请输入mock文件');
  return;
}

if (!schema) {
  console.log('请输入schema文件');
  return;
}

const content = fs.readJsonSync(mock, 'utf-8');

deepAssign(content);

fs.writeJSONSync(schema, JSON.parse(schemaGenerator(content, needTitle, needDefault)), {spaces: 2});

console.log('success !!')