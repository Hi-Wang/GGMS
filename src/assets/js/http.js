import axios from 'axios'
import { BASE_URL } from 'assets/js/config'
import { promptAlert } from 'assets/js/common'

 /**
  * 请求拦截器
  **/
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken 
axios.interceptors.request.use(function (config){
  // 发起请求时，取消当前进行的相同请求
  return config;
}, function(err){
  return Promise.reject(err);
})

/**
 * 响应拦截器
 **/
axios.interceptors.response.use(function (response){
  return response;
}, function (err){
  if(err && err.response) {
    switch (err.response.flag) {
      case 422:
        err.message = '参数验证错误'
        break;
      case 500:
        err.message = '服务器错误'
        break;
      case 403:
        err.message = '权限错误'
        break;    
      default:
        err.message = `连接错误${err.response.flag}`    
    }
    promptAlert('error', err.message)
  } else {
    err.message = '连接到服务器失败'
  }
  return Promise.resolve(err.response);
})

/**
 * axios封装
 */
function apiAxios(method, url = '', params, callback, self) {
    axios({
      method: method,
      baseURL: baseURL,
      url: url,
      data: method === 'POST' ? data : null,
      params: method === 'GET' ? data : null,
      withCredentials: true,
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then(function (res) {
      if (res.data.code == 0) {
        callback && callback(res.data);
      }else if(res.data.code == 101) {
        //登录超时
        error(`${mklog()}【M=${url}】【接口提示：】 ${res.data.msg}`);
        self.$router.push({path:'/login'});
      }else if(res.data.msg == 'token不能为空') {
        self.$router.push('/login');
      } else {
        promptAlert('error', res.data.msg)
        error(`${mklog()}【M=${url}】【接口提示：】 ${res.data.msg}`);
      }
      if(self) {
        setTimeout(()=>{
          self.time=0;
        },500)
      }
      Indicator.close();
    })
    .catch(function (err) {
      error(`${mklog()}【M=${url}】【错误原因：】 ${err}`);
      if(debug){
        promptAlert('error', err)
      }
      if(self) {
        setTimeout(()=>{
          self.time=0;
        },500)
      }
      Indicator.close();
    });
  }
  
  const get = (url, params, callback, self)=> {
    return apiAxios('GET', url, params, callback, self);
  };
  const post = (url, params, callback, self)=> {
    return apiAxios('POST', url, params, callback, self);
  };

  export default {
    get,
    post
  }