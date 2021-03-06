/**
 * 公用的方法
 */
import Cookies from 'js-cookie';
import { MessageBox, Message } from 'element-ui' ;

const TokenKey = 'Admin-Token';

/**
 * 弹框带确认
 * title: 弹框的标题
 * message： 弹框内容
 * type: 弹框类型 success / info / warning / error
 */ 
const alertModel = ( type, title, message ) => {
  MessageBox({
    type: type,
    title: title,
    message: message,
    distinguishCancelAndClose: true,
    callback: () => {
      setTimeout(() => {
        MessageBox.close();
      }, 1000);
    }
  });
};

/**
 * 提示框
 * message： 弹框内容
 * type: 弹框类型 success / info / warning / error
 */ 
const promptAlert = ( type, message ) => {
  Message({
    type: type,
    message: message,
    duration: 2000,
    showClose: true
  });
};

/**
 * 获取Token
 */
const getToken = () => {
  return Cookies.get(TokenKey);
};

/**
 * 存储Token
 */
const setToken = (token) => {
  return Cookies.set(TokenKey, token);
};

/**
 * 删除Token
 */
const removeToken = () => {
  return Cookies.remove(TokenKey);
};


/**
 * 存储localStorage
 */
const setStore = ( name, content ) => {
  if (!name) {
    return;
  };
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};
  
/**
 * 获取localStorage
 */
const getStore = ( name ) => {
  if (!name) {
    return true;
  } else {
    return window.localStorage.getItem(name);
  }
};
  
/**
 * 删除localStorage
 */
const removeStore = ( name ) => {
  if (!name) {
    return;
  };
  window.localStorage.removeItem(name);
};

/**
 * 验证正整数
 */
const isuInteger = ( num ) => {
  if ((!/^[1-9]+\d*$/).test(num)) {
    return false;
  }
  return true;
};

/**
 * 验证手机号
 */
const isPhone = e => {
  let integer1 = /^1\d{10}$/;
  if (!integer1.test(e)) {
    return false;
  }
  return true;
};
  
/**
 * 验证邮箱
 */
const isEmail = ( e ) => {
  let szReg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
  if (!szReg.test(e)) {
    return false;
  }
  return true;
};  

/**
 *解析时间戳 
  */ 
const timeToTimeStamp = ( timestamp ) => {
  let timestamps = Date.parse(new Date(timestamp));
  timestamp = timestamps / 1000;
  return timestamp;
};
  

/**
 * 判断是否为空
 * @param {Object} str
 */
const isEmpty = ( str ) => {
  let retValue = false;
  try {
    if (!str || str === "''" || str === "null" || str === "{}" || str === "[]" || str === "'[]'" || str === "<null>" || str.length === 0 || str === "") {
      retValue = true;
    } else {
      retValue = false;
    }
  } catch (e) {
    retValue = false;
  }
  return retValue;
};

/**
 * 获取cookie
 */
const	getCookie = ( name ) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");  
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;   
  }
};
  
/**
 * 用户名验证
 */
const isvalidUsername = (str) => {
  const valid_map = ['admin', 'editor', 'wang'];
  return valid_map.indexOf(str.trim()) >= 0;
};

/**
 * Url
 */
const validateURL = (textval) => {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
};

/**
 * Email
 */ 
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * 小写字母
 */
const validateLowerCase = (str) => {
  const reg = /^[a-z]+$/;
  return reg.test(str);
};

/**
 *大写字母 
 */
const validateUpperCase = (str) => {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
};

/**
 *大小写字母 
 */
const validateAlphabets = (str) => {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
};

const param2Obj = (url) => {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};

const parseTime = (time, cFormat) => {
  // if (arguments.length === 0) {
  //   return null;
  // }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    } 
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
};

const formatTime = (time, option) => {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
};

export {
  getToken,
  setToken,
  isPhone,
  isEmail,
  removeToken,
  setStore,
  getStore,
  removeStore,
  isuInteger,
  alertModel,
  promptAlert,
  timeToTimeStamp,
  isEmpty,
  getCookie,
  isvalidUsername,
  validateURL,
  validateEmail,
  validateLowerCase,
  validateUpperCase,
  validateAlphabets,
  param2Obj,
  parseTime,
  formatTime
};