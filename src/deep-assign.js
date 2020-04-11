var _ = require('lodash');

function mergeArrayToFirst(json) {
  if (_.isArray(json) && json.length > 0) {
    let obj = {};
    for (let k in json) {
      let v = json[k];
      for (let k1 in v) {
        if (!obj[k1]) {
          obj[k1] = v[k1];
        } else if (_.isArray(v[k1])) {
          obj[k1] = [...obj[k1], ...v[k1]];
        }
      }
    }
    for (let k in obj) {
      if (_.isArray(obj[k])) {
        mergeArrayToFirst(obj[k]);
      }
    }
    json[0] = obj;
  }
}

function deepAssign(json) {
  if (_.isPlainObject(json)) {
    for (let k in json) {
      deepAssign(json[k]);
    }
  } else if (_.isArray(json)) {
    mergeArrayToFirst(json);
  }
}

module.exports = deepAssign;