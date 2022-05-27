/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor', 'WangJ']
  // return valid_map.indexOf(str.trim()) >= 0
  return true;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

// /**
//  * @param {null} value
//  * @returns {Boolean}
//  */
// export function isnull(value) {
//   if (typeof value === null) {
//     return true
//   } else {
//     return false
//   }
// }

export const rulesObj = {
  username: /^[\u4e00-\u9fa5]{0,}$/, // 中文
  tel: /^1[3|4|5|6|7|8|9]\d{9}$/, // 电话
  tel2: /^[1][3,4,5,7,8][0-9]{9}$/, // 电话
  privateIdEntityId: /^([1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])$/, // 身份证
  noprivateIdEntityId: /^[0-9x]*$/, // 模糊查询身份证
  number: /^[0-9]*$/, // 数字
  alnum: /^[A-Za-z0-9]+$/, // 英文和数字
  kyop: /^[\u4E00-\u9FA50-9]+$/, // 中文和数字
  english: /^[A-Za-z/ ]+$/, // 英文
  data: /^\d{4}-\d{1,2}-\d{1,2}/, // 年月日
  nospace: /^[^\s]+$/, // 不含空格
  money: /^\d+(\.\d{1,2})?$/, // 带最多2位小数的数字
  planMoney: /^\d{1,10}(\.\d{1,4})?$/, // 带最多4位小数的数字
  contractMoney: /^\d{1,10}(\.\d{1,6})?$/, // 带最多6位小数的数字
  homenumber: /\d{3}-\d{8}|\d{4}-\d{7}/, // 国内电话
  companynumber: /^\d{5}-\d{4}$|^\d{4}-\d{8}$|^\d{4}-\d{7}$|^\d{4}$/,
  companynumberone: /^\d{3,5}-\d{4,8}|\d{4}|\d{11}$/,
  phoneNumber: /^(^1[3|4|5|7|8]\d{9})|(\d{3}-\d{8}|\d{4}-\d{x7})$/,
  datatime: /^\-\d+$/,
  email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, // 邮箱验证
  // integer: /^[+]{0}(\d+)\d+(\.\d*)?$/                                       //正整数验证
  integer: /^[1-9]\d*$/,
  // ip: /^10(\.([2][0-4]\d|[2][5][0-5]|[01]?\d?\d)){3}$/,
  ip: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
  MAC: /^([A-F0-9]{2}(:[A-F0-9]{2}){5})|([A-F0-9]{2}(-[A-F0-9]{2}){5})$/, // 电脑MAC
  SIZE: /^([0-9]*(GB|G|TB|T|M|MB|C)(\/)?)+$/, // 内存16GB/16G
  kSize: /^([0-9]*(K|KB|C)(\/)?)+$/, // 单独校验K
  numberMoney: /^[+-]?[\d]+([\.][\d]+)?([Ee][+-]?[\d]+)?$/,
  // email:/^[A-Za-z\d]+[]/
};
