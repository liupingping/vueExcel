/**
 * 扩展js的原型链prototype方法
 * 这样就可以在全局内方便使用而不用加载
 *
 * @ahtor zyl
 */

import { toByteArray } from 'base64-js';

/**
 * 继承多个对象 不替换/不递归/保留索引
 *
 * @param dest
 * @param arguments(1,n)
 * @returns {Object}
 */
export const extend = function (dest) {
  for (let i = 1, l = arguments.length; i < l; i++) {
    const target = arguments[i] || {};
    for (const key in target) {
      if (typeof dest[key] === 'undefined') {
        dest[key] = target[key];
      } else {
        // console.warn(key + ' defined')
      }
    }
  }
  return dest;
};

/**
 * 对象类型判断方法分配
 * 不替换原有方法：isArray
 * use: Number.isNumber(objectName) || Object.isNumber(objectName) 但建议使用typeof
 * * */
const { toString } = Object.prototype;
const typeMap = {
  '[object Boolean]': [Boolean, 'Boolean'],
  '[object Number]': [Number, 'Number'],
  '[object String]': [String, 'String'],
  '[object Function]': [Function, 'Function'],
  '[object Array]': [Array, 'Array'],
  '[object Date]': [Date, 'Date'],
  '[object RegExp]': [RegExp, 'RegExp'],
  // '[object Undefined]': [undefined, 'Undefined'],
  // '[object Null]': [null, 'Null'],
  '[object Object]': [Object, 'Object'],
  // '[object Promise]': [Promise, 'Promise'],
};
for (const type in typeMap) {
  const map = typeMap[type];
  const obj = map[0];
  const iss = `is${map[1]}`;
  if (typeof obj[iss] === 'function') {
    // console.warn('[native code] ' + map[1] + '.' + iss + ' already defined')
  } else {
    obj[iss] = (v) => toString.call(v) === type;
  }
  Object[iss] = obj[iss];
}

const { slice } = Array.prototype;

/**
 * 获取对象类型
 *
 * @param obj
 * @return {String}
 */
export const typeOf = function (obj) {
  const ret = typeMap[toString.call(obj)];
  return ret ? ret[1].toLowerCase() : 'undefined';
};

// extend Object
extend(Object, {
  extend,
  typeOf,
  /**
   * 使用方法遍历对象
   *
   * @param obj
   * @param callback
   * @param context
   */
  forEach(obj, callback, context) {
    for (const key in obj) {
      callback.call(context, obj[key], key);
    }
  },
  /**
   * 是否为Promise实例
   *
   * @param obj
   * @return {boolean}
   */
  isPromise(obj) {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
  },
  /**
   * 是否为组件
   *
   * @param obj
   * @returns {boolean}
   */
  isComponent(obj) {
    return obj && (typeof obj === 'object' || typeof obj === 'function');
  },
  /**
   * 是否为空对象
   *
   * @param obj
   * @returns {boolean}
   */
  isEmpty(obj) {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        return false;
      }
    }
    return true;
  },
  /**
   * 方法作用到对象中每一个值
   *
   * @param obj
   * @param callback
   * @param deep
   * @return {Object}
   */
  map(obj, callback, deep = true) {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        const value = obj[key];
        if (Object.isObject(value)) {
          obj[key] = Object.map(value, callback, deep);
        } else if (Array.isArray(value)) {
          obj[key] = value.map((item) => Object.map(item, callback, deep));
        } else {
          obj[key] = callback(value);
        }
      }
    }
    return obj;
  },
  /**
   * 对象数组 转 数组
   *
   * @param obj
   * @return {Array}
   */
  toArray(obj) {
    return slice.call(obj);
  },
  /**
   * 不替换继承对象
   *
   * @param dest
   * @param target
   * @param ignoreKeys
   * @return {Object}
   */
  include(dest, target, ignoreKeys = []) {
    for (const key in target) {
      if (typeof dest[key] === 'undefined' && !ignoreKeys.contains(key)) {
        dest[key] = target[key];
      }
    }
    return dest;
  },
  /**
   * 替换继承对象
   *
   * @param dest
   * @param target
   * @param ignoreKeys
   * @return {Object}
   */
  replace(dest, target, ignoreKeys = []) {
    for (const key in target) {
      if (!ignoreKeys.contains(key)) {
        dest[key] = target[key];
      }
    }
    return dest;
  },
  /**
   * 去除左右空格
   *
   * @param obj
   * @returns {Object}
   */
  trimSingle(value, deep = true) {
    if (String.isString(value)) {
      return value.trim();
    }
    if (Object.isObject(value)) {
      return Object.trim(value, deep);
    }
    if (Array.isArray(value)) {
      return value.trim(deep);
    }
    return value;
  },
  trim(obj, deep = true) {
    if (obj && typeof obj === 'object') { // object/array
      for (const key in obj) {
        obj[key] = Object.trimSingle(obj[key], deep);
      }
    }
    return obj;
  },
  /**
   * 复制对象
   *
   * @param obj
   * @param deep
   * @returns {Object}
   */
  cloneSingle(value, deep = true) {
    if (Object.isObject(value)) {
      return Object.clone(value, deep);
    }
    if (Array.isArray(value)) {
      return value.clone(deep);
    }
    return value;
  },
  clone(obj, deep = true) {
    const hash = {};
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        hash[key] = Object.cloneSingle(obj[key], deep);
      }
    }
    return hash;
  },
  /**
   * 返回两个对象中不相同的部分(递归)
   *
   * @param newValue
   * @param oldValue
   * @param primaryKey
   * @param ignoreKeys
   * @returns {Object}
   */
  diffSingle(newValue, oldValue, primaryKey = '', ignoreKeys = []) {
    if (oldValue === undefined) {
      return newValue;
    }
    if (oldValue === newValue) { // 修改过
      return undefined;
    }
    if (Object.isObject(newValue)) {
      return Object.isObject(oldValue) ? Object.diff(newValue, oldValue, primaryKey, ignoreKeys) : newValue;
    }
    if (Array.isArray(newValue)) {
      return Array.isArray(oldValue) ? newValue.diff(oldValue, primaryKey, ignoreKeys, true) : newValue;
    }
    if (Date.isDate(newValue)) {
      // 日期格式默认时分秒为00:00:00
      if (newValue.toString() === (new Date(oldValue + (String.isString(oldValue) && oldValue.indexOf(' ') === -1 ? ' 00:00:00' : ''))).toString()) {
        return undefined;
      }
    }
    return newValue;
  },
  diff(newData, oldData, primaryKey = '', ignoreKeys = []) {
    const data = {};
    if (newData && typeof newData === 'object') {
      for (const key in newData) {
        if (!ignoreKeys.contains(key)) {
          const oldv = oldData[key];
          if (primaryKey && primaryKey === key) { // 保留主键
            data[key] = oldv;
          } else {
            const newv = Object.diffSingle(newData[key], oldv, primaryKey, ignoreKeys);
            if (newv !== undefined) {
              data[key] = newv;
            }
          }
        }
      }
    }
    return data;
  },
  /**
   * 捕获Promise异常到控制台warn
   *
   * @param data
   * @return {Promise<any>}
   */
  console(data) {
    const promise = new Promise((resolve, reject) => reject(data));
    promise.catch((data) => data && console.warn(data));
    return promise;
  },
});

// extend Array
extend(Array, {
  isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  },
  arrToString(arr, join = ',') {
    if (arr && arr.length > 0) {
      if (Array.isArray(arr)) {
        return arr.join(join);
      }
      if (String.isString(arr)) {
        return arr;
      }
    }
    return '';
  },
});

// extend String
extend(String, {
  trim: Object.trim,
  toArray(str, split = ',') {
    if (str && str.length > 0) {
      if (Array.isArray(str)) {
        return str.map((item) => item.trim());
      }
      if (String.isString(str)) {
        return str.split(split);
      }
      return [str];
    }
    return [];
  },
  toTrim(str, nextArr, key = 'value') {
    const s = parseFloat(str) ? str : '';
    const arr = nextArr.map((item) => parseFloat(item[key]));
    if (arr.length) {
      const a = !arr.some((i) => i !== 0);
      if (a) {
        return s;
      }
      return str;
    }
    return s;
  },
});

// extend Function
// extend(Function, {
//   noop() {
//     return function () {
//
//     }
//   }
// });

// String.prototype
extend(String.prototype, {
  /**
   * 首字母大写
   *
   * @return {string}
   */
  ucfirst() {
    return this.charAt(0).toUpperCase() + this.substr(1);
  },
  /**
   * 重复若干(len)次
   *
   * @param len
   * @return {String}
   */
  repeat(len) {
    let str = '';
    while (len-- > 0) {
      str += this;
    }
    return str;
  },
  /**
   * 用指定的字符(char)将自身扩展到指定长度(max_len)
   *
   * @param char
   * @param max_len
   * @return {string}
   */
  pad(char, max_len) {
    const str = this;
    const len = str.length;
    return len < max_len ? char.repeat(max_len - len) + str : str;
  },
  /**
   * 字符长度，中文+2
   *
   * @return {number}
   */
  len(ch = 2, en = 1) {
    let len = 0;
    const chr = /[\u4e00-\u9fa5]+/;
    for (let i = 0, l = this.length; i < l; i++) {
      const char = this.charAt(i);
      if (chr.test(char)) {
        len += ch;
      } else {
        len += en;
      }
    }
    return len;
  },
  add(arg1) {
    const arg = parseFloat(this || 0);
    return arg.add(parseFloat(arg1 || 0));
  },
  /**
   * base64编码
   *
   * @return {string}
   */
  encode() {
    return new Buffer(this).toString('base64');
  },
  /**
   * base64解码
   *
   * @return {string}
   */
  decode() {
    return String.fromCharCode(...toByteArray(this));
  },
  /**
   * 删除一段字符串
   *
   * @param str
   * @param split
   * @return {string}
   */
  remove(str, split = ',') {
    return this.split(split).remove(str).join(',');
  },
});

// Array.prototype
extend(Array.prototype, {
  toArray() {
    return this.slice(0);
  },
  /**
   * 值是否存在
   *
   * @param item
   * @return {boolean}
   */
  contains(item) {
    return this.indexOf(item) !== -1;
  },
  /**
   * 添加项 如果不存在
   *
   * @param item
   * @return {Array}
   */
  add(item) {
    this.indexOf(item) === -1 && this.push(item);
    return this;
  },
  /**
   * 删除项 如果存在
   *
   * @param item
   * @return {Array}
   */
  remove(item) {
    const index = this.indexOf(item);
    index === -1 || this.splice(index, 1);
    return this;
  },
  /**
   * [...Object] 是否有对象
   *
   * @param obj
   * @param fromKey
   * @param toKey
   * @return {boolean}
   */
  hasObj(obj, fromKey = 'id', toKey = 'id') {
    return this.some((item) => item[fromKey] === obj[toKey]);
  },
  /**
   * [...Object] 查找对象
   *
   * @param obj
   * @param fromKey
   * @param toKey
   * @return {boolean}
   */
  findObj(obj, fromKey = 'id', toKey = 'id') {
    const index = this.findIndex((value) => {
      if (!obj[fromKey] && String.isString(obj)) { // 数组内只是字符窜的话 直接判断就好了 不需要key值，否则一直返回的是0
        return obj === value;
      }
      return obj[fromKey] === value[toKey];
    });
    return index === -1 ? null : this[index];
  },
  /**
   * [...Object] 添加对象
   *
   * @param obj
   * @param fromKey
   * @param toKey
   * @return {boolean}
   */
  addObj(obj, fromKey = 'id', toKey = 'id') {
    this.hasObj(obj, fromKey, toKey) || this.push(obj);
    return this;
  },
  /**
   * [...Object] 删除对象
   *
   * @param obj
   * @param fromKey
   * @param toKey
   * @param isAny
   * @return {boolean}
   */
  removeObj(obj, fromKey = 'id', toKey = 'id', isAny = false) {
    const isSome = this.some((item, index) => {
      if (item[fromKey] === obj[toKey]) {
        this.splice(index, 1);
        return true;
      }
      return false;
    });
    if (isAny && isSome) {
      return this.removeObj(obj, fromKey, toKey, true);
    }
    // return isSome
    return this;
  },
  /**
   * 返回两个数据中不相同的项 深度递归
   *
   * @param oldData
   * @param primaryKey
   * @param ignoreKeys
   * @return {boolean}
   */
  diff(oldData, primaryKey = '', ignoreKeys = [], isChild = false) {
    const l = oldData && oldData.length;
    if (!l || l != this.length) {
      return this.slice(0);
    }
    // 如果是object里的数组 相等就不判断了 直接全部返回
    if (isChild == true) {
      return this.slice(0);
    }
    const diff = [];
    this.forEach((newv, key) => {
      const oldv = primaryKey ? oldData.findObj(newv, primaryKey, primaryKey) : oldData[key];
      if ((newv = Object.diffSingle(newv, oldv, primaryKey, ignoreKeys)) !== undefined) {
        diff[key] = newv;
      }
    });

    return diff && diff.length == 0 ? undefined : diff; // 相同的数组返回undefined 而不是[]
  },
  /**
   * 去除数组中每个值的左右空格
   *
   * @param obj
   * @param fromKey
   * @param toKey
   * @return {boolean}
   */
  trim(deep = true) {
    return this.map((item) => Object.trimSingle(item, deep));
  },
  /**
   * 获取数据数据最后一条
   *
   * @return {*}
   */
  end() {
    return this[this.length - 1];
  },
  /**
   * 收集数组对象中某个字段的值
   * Array<Object>
   *
   * @param key
   * @return {Array}
   */
  column(key) {
    const columns = [];
    this.forEach((item) => {
      const type = typeof item;
      if (type === 'string' || type === 'number') {
        columns.push(item);
      } else if (type === 'object' && item[key] !== undefined) {
        columns.push(item[key]);
      }
    });
    return columns;
  },
  /**
   * 继承多个数组
   * 数组值唯一
   *
   * @return {Array}
   */
  extend() {
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i].forEach((item) => {
        if (this.indexOf(item) === -1) {
          this.push(item);
        }
      });
    }
    return this;
  },
  /**
   * 克隆一个数组
   *
   * @param deep
   * @return {Array}
   */
  clone(deep = true) {
    if (!deep) {
      return this.slice(0);
    }
    const list = [];
    this.forEach((item) => list.push(Object.cloneSingle(item, deep)));
    return list;
  },
  /**
   * 数组树转hash: key=>value
   * Array<Object.children>
   *
   * @param key primaryKey名称
   * @param keepRef 是否保留引用
   * @param logIndex 是否记录index
   * @return {Object}
   */
  toHash(key, keepRef = false, logIndex = false, child = 'children') {
    const hash = {};
    if (this.length > 0 && typeof key === 'string') {
      const each = (value, index) => {
        hash[value[key]] = logIndex ? [value, index] : value;
        if (value[child]) {
          Object.assign(hash, value[child].toHash(key, keepRef, logIndex, child));
        }
      };
      if (keepRef) { // 保留引用
        this.forEach(each);
      } else {
        this.forEach((info, index) => {
          each(Object.clone(info), index);
        });
      }
    }
    return hash;
  },
  /**
   * 数组tree扁平化按层级排列
   */
  toDelay(callback, context, keepRef = true, level = 0) {
    let list = [];
    this.forEach((value) => {
      list.push(callback ? callback.call(context, value, level) : value);
    });
    this.forEach((value) => {
      if (value.children) {
        list = list.concat(value.children.toDelay(callback, context, keepRef, level + 1));
      }
    });
    return list;
  },
  /**
   * 数组Tree转List
   *
   * @param callback 回调方法
   * @param context 回调this
   * @param keepRef 是否保留引用
   * @return {Array}
   */
  toList(callback, context, keepRef = true, level = 0, child = 'children') {
    let list = [];
    const each = (value) => {
      list.push(callback ? callback.call(context, value, level) : value);
      if (value[child]) {
        list = list.concat(value[child].toList(callback, context, keepRef, level + 1, child));
      }
    };
    if (keepRef) {
      this.forEach(each);
    } else {
      this.forEach((item) => {
        each(Object.clone(item));
      });
    }
    return list;
  },
  /**
   * 根据主键ID查找数组Tree中的对象
   *
   * @param id
   * @param key
   * @return {*}
   */
  findChildren(value, key = 'id', childName = 'children') {
    let child = null;
    for (let i = 0, l = this.length; i < l; i++) {
      if (this[i][key] === value) {
        return this[i];
      }
      const children = this[i][childName];
      if (children) {
        if ((child = children.findChildren(value, key, childName)) !== null) {
          break;
        }
      }
    }
    return child;
  },
  /**
   * 按某键进行分组
   *
   * @param key
   */
  groupBy(key) {
    const group = {};
    this.forEach((item) => {
      const value = item[key];
      group[value] = group[value] || [];
      group[value].push(item);
    });
    return group;
  },
  /**
   *
   *递归遍数组
   * @param callback
   * @param item
   */
  mapArray(callback) {
    const arr = this;
    return arr.map((item) => {
      if (Object.isArray(item.children)) {
        item.children = item.children.mapArray(callback);
      }
      return callback(item);
    });
  },
});

// Date.prototype
extend(Date.prototype, {
  /**
   * 日期转yyyy-MM-dd
   *
   * @return {string}
   */
  toYmdString(seperator = '-') {
    return this.getFullYear() + seperator
      + (this.getMonth() + 1).toString().pad('0', 2) + seperator
      + this.getDate().toString().pad('0', 2);
  },
  /**
   * 日期转yyyy年MM月dd日
   *
   * @return {string}
   */
  toYmdChinese() {
    return `${this.getFullYear()}年${
      (this.getMonth() + 1).toString().pad('0', 2)}月${
      this.getDate().toString().pad('0', 2)}日`;
  },
  /**
   * 日期转yyyy-MM
   *
   * @return {string}
   */
  toYmString(seperator = '-') {
    return this.getFullYear() + seperator
      + (this.getMonth() + 1).toString().pad('0', 2);
  },
  /**
   * 日期转yyyy-MM-dd hh:ii:ss
   *
   * @return {string}
   */
  toYmdhisString(seperator1 = '-', seperator2 = ' ', seperator3 = ':') {
    return this.getFullYear() + seperator1
      + (this.getMonth() + 1).toString().pad('0', 2) + seperator1
      + this.getDate().toString().pad('0', 2) + seperator2
      + this.getHours().toString().pad('0', 2) + seperator3
      + this.getMinutes().toString().pad('0', 2) + seperator3
      + this.getSeconds().toString().pad('0', 2);
  },
  /**
   * 日期转yyyy-MM-dd hh:ii
   *
   * @return {string}
   */
  toYmdhiString(seperator1 = '-', seperator2 = ' ', seperator3 = ':') {
    return this.getFullYear() + seperator1
      + (this.getMonth() + 1).toString().pad('0', 2) + seperator1
      + this.getDate().toString().pad('0', 2) + seperator2
      + this.getHours().toString().pad('0', 2) + seperator3
      + this.getMinutes().toString().pad('0', 2);
  },
});

// Function.prototype
// extend(Function.prototype, {
// });
extend(Number.prototype, {
  add(arg1) {
    const arg2 = this;
    let r1; let r2; let
      m;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (error) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (error) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (Math.round(arg1 * m) + Math.round(arg2 * m)) / m;
  },
  cut(arg1) {
    const arg2 = this;
    let r1; let r2; let
      m;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (error) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (error) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m - arg2 * m) / m;
  },
});

// Element.prototype
extend(Element.prototype, {
  /**
   * 对象数组转数组
   *
   * @return {T[]}
   */
  getChildren() {
    return Object.toArray(this.children);
  },
  /**
   * 添加元素 如果不存在
   *
   * @param item
   * @return {Element}
   */
  appendChildx(elem) {
    this.contains(elem) || this.appendChild(elem);
    return this;
  },
  /**
   * 删除元素 如果存在
   *
   * @param item
   * @return {Element}
   */
  removeChildx(elem) {
    this.contains(elem) && this.removeChild(elem);
    return this;
  },
  /**
   * 获取元素距离页面最上方的偏移值
   *
   * @return {number}
   */
  getOffsetTop() {
    const { top } = this.getBoundingClientRect();
    const win = this.ownerDocument.defaultView;
    return top + win.pageYOffset;
  },
  /**
   * 设置滚动条偏移量
   *
   * @return {number}
   */
  scrollTo(left, top) {
    this.scrollLeft = left;
    this.scrollTop = top;
  },
});

// <= chrome46
if (window.NodeList) {
  extend(NodeList.prototype, {
    forEach(callback) {
      if (callback && typeof callback === 'function') {
        for (let i = 0, l = this.length; i < l; i++) {
          callback(this[i], i);
        }
      }
    },
  });
}
