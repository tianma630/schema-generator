const util = require('./util');

/**
 * 数据处理，处理数组中的对象的字段个数不一的问题，将同级数组下的对象字段合并到第一个数组的第一个对象
 * @param {json} value 
 */
function processData(value) {
  if (util.isObject(value)) {
    for (let k in value) {
      processData(value[k]);
    }
  } else if (util.isArray(value)) {
    mergeArray(value);
  }
}

function mergeArray(value) {
  if (util.isArray(value) && value.length > 0) {
    let obj = {};
    for (let k in value) {
      let v = value[k];
      for (let k1 in v) {
        if (!obj[k1]) {
          obj[k1] = v[k1];
        } else if (util.isArray(v[k1])) {
          obj[k1] = [...obj[k1], ...v[k1]];
        }
      }
    }
    for (let k in obj) {
      if (util.isArray(obj[k])) {
        mergeArray(obj[k]);
      }
    }
    value[0] = obj;
  }
}

module.exports = processData;