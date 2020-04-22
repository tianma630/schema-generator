const util = require('./util');
const art = require('./tpl');
const titleMap = require('./title-map');

/**
 * 解析mock数据，生成schemer结构数据
 * @param {json} value mock数据
 * @param {string} title 标题
 * @param {boolean} needTitle 是否需要映射标题
 * @param {boolea} needDefault 是否需要默认值
 */
function compile(value, title = 'Schema', needTitle, needDefault) {
  /**
   * 递归遍历子节点
   * @param {json} value 
   * @param {string} title 
   * @param {boolean} inObject 该节点是否是对象中的节点，区分{{}}和[{}]
   */
  function compileChildren(value, title, inObject) {
    // 基础类型字段处理
    if (util.isNumber(value) || util.isString(value) || util.isBoolean(value) || util.isNull(value)) {
      return art.itemRender({data: {
        title,
        type: util.isNull(value) ? 'string' : typeof value,
        name: needTitle ? (titleMap[title] || title) : title,
        defaultValue: util.isString(value) ? `"${value}"` : value,
        needDefault: util.isNull(value) ? false : needDefault,
      }});
      // 对象类型处理
    } else if (util.isObject(value)) {
      const items = [];
      for (let k in value) {
        items.push(compileChildren(value[k], k, true))
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
      // 数组类型处理
    } else if (util.isArray(value)) {
      const items = [];
      let v = value[0] || {}; // 直接使用数组中的第一个对象，因为在process-data已经做过合并

      for (let k in v) {
        items.push(compileChildren(v[k], k, false));
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

  return compileChildren(value, title);
}

module.exports = (json, needTitle, needDefault) => compile(json, 'Schema', needTitle, needDefault);