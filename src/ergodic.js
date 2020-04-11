var _ = require('lodash');
var art = require('./tpl');
var titleMap = require('./title-map');

function ergodic(json, title = 'Schema', needTitle, needDefault, inObject) {
  if (_.isNumber(json)) {
    return art.itemRender({data: {
      title,
      type: 'number',
      name: needTitle ? (titleMap[title] || title) : title,
      defaultValue: json,
      needDefault,
    }});
  } else if (_.isString(json)) {
    return art.itemRender({data: {
      title,
      type: 'string',
      name: needTitle ? (titleMap[title] || title) : title,
      defaultValue: `"${json}"`,
      needDefault,
    }});
  } else if (_.isBoolean(json)) {
    return art.itemRender({data: {
      title,
      type: 'boolean',
      name: needTitle ? (titleMap[title] || title) : title,
      defaultValue: json,
      needDefault,
    }});
  } else if (_.isPlainObject(json)) {
    const items = [];
    for (let k in json) {
      items.push(ergodic(json[k], k, needTitle, needDefault, true))
    }
    if (items.length > 0) {
      items[items.length - 1] = items[items.length - 1].substr(0, items[items.length - 1].length - 1);
    }
    if (title == 'Schema') {
      return art.schemaRender({
        data: {
          title,
          items,
        }
      });
    } else {
      if (inObject) {
        return art.objectInObjectRender({
          data: {
            title,
            items,
          }
        });
      } else {
        return art.objectInArrayRender({
          data: {
            title,
            items,
          }
        });
      }
    }
  } else if (_.isArray(json)) {
    const items = [];
    // let v = Object.assign({}, ...json);
    let v = json[0] || {};

    for (let k in v) {
      items.push(ergodic(v[k], k, needTitle, needDefault, false));
    }

    if (items.length > 0) {
      items[items.length - 1] = items[items.length - 1].substr(0, items[items.length - 1].length - 1);
    }
    
    return art.arrayRender({
      data: {
        title,
        items,
      }
    });
  }
}

module.exports = (json, needTitle, needDefault) => ergodic(json, 'Schema', needTitle, needDefault);