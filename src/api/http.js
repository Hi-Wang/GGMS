import axios from 'axios';
import { Loading, Message } from 'element-ui';
import { BASE_URL } from 'assets/js/config';
import { getToken } from 'assets/js/common';
import store from 'store';

// let cancel, promiseArr = {}
// const CancelToken = axios.CancelToken 

axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

/**
* 请求拦截器
*/
let loadinginstace;
axios.interceptors.request.use( config => {
  // 发起请求时，取消当前进行的相同请求
  if (store.getters.token) {
    config.headers['X-Token'] = getToken();
  }
  loadinginstace = Loading.service({ fullscreen: true });
  return config;
}, err => {
  loadinginstace.close();
  return Promise.reject(err);
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
  loadinginstace.close();
  const res = response.data;
  if (res.code !== 200) {
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject('error');
  } else {
    return response;
  }
  // return response;
}, err => {
  // if(err && err.response) {
  //   switch (err.response.flag) {
  //     case 422:
  //       err.message = '参数验证错误'
  //       break;
  //     case 500:
  //       err.message = '服务器错误'
  //       break;
  //     case 403:
  //       err.message = '权限错误'
  //       break;    
  //     default:
  //       err.message = `连接错误${err.response.flag}`    
  //   }
  //   promptAlert('error', err.message)
  // } else {
  //   err.message = '连接到服务器失败'
  // }

  console.log('err' + err);
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  });
  return Promise.reject(err);
});

/**
 * axios封装
 */
function apiAxios(method, url = '', params, callback, self) {
  axios({
    method: method,
    baseURL: BASE_URL,
    url: url,
    data: method === 'POST' ? data : null,
    params: method === 'GET' ? data : null,
    withCredentials: true,
    timeout: timeout,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(function (res) {
    if (res.data.code === 0) {
      callback && callback(res.data);
    } else if (res.data.code === 101) {
      // 登录超时
      error(`${mklog()}【M=${url}】【接口提示：】 ${res.data.msg}`);
      self.$router.push({path:'/login'});
    } else if (res.data.msg === 'token不能为空') {
      self.$router.push('/login');
    } else {
      // 错误提示
      error(`${mklog()}【M=${url}】【接口提示：】 ${res.data.msg}`);
    }
    if (self) {
      setTimeout( () => {
        self.time=0;
      }, 500);
    }
  }).catch(err => {
    error(`${mklog()}【M=${url}】【错误原因：】 ${err}`);
    if (debug) {
      // 错误提示
    }
    if (self) {
      setTimeout(() => {
        self.time=0;
      }, 500);
    }
  });
}
const GET = (url, params, callback, self) => {
  return apiAxios('GET', url, params, callback, self);
};
const POST = (url, params, callback, self) => {
  return apiAxios('POST', url, params, callback, self);
};
export default {
  GET,
  POST
};