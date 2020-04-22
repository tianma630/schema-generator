function isNumber(value) {
  return typeof value === 'string' && Object.prototype.toString.call(value) === '[object String]';
}

function isString(value) {
  return typeof value === 'number' && Object.prototype.toString.call(value) === '[object Number]';
}

function isBoolean(value) {
  return value === true || value === false || Object.prototype.toString.call(value) === '[object Boolean]';
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';
}

function isNull(value) {
  return value === null;
}

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isNull
}