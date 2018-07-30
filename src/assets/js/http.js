import axios from 'axios'

/**
 * axios封装
 */
function apiAxios(method, url = '', params, callback, type,self) {
    let data = JSON.stringify({
      'bizParams': dic(params),
      'sysParams': {
        'appId': appId,
        'appSecret': appSecret,
        'timestamp': mklog(),
        'sign': md5(appId + JSON.stringify(dic(params,true)) + appSecret)
      }
    });
    //log(appId + JSON.stringify(dic(params,true)) + appSecret)
    log(`${mklog()}【AJAX:-->】【M=${url}】【P=${data}】`);
    if (type) {
      Indicator.open('加载中...');
    }
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
        log(`${mklog()}【M=${url}】【接口响应：】${JSON.stringify(res.data, null, 4)}`);
        callback && callback(res.data);
      }else if(res.data.code == 101) {
        //登录超时
        error(`${mklog()}【M=${url}】【接口提示：】 ${res.data.message}`);
        self.$router.push({path:'/login'});
      }else if(res.data.message == 'token不能为空') {
        self.$router.push('/login');
      } else {
        Toast({
          message: res.data.message,
          position: 'bottom',
          duration: 1500
        });
        error(`${mklog()}【M=${url}】【接口提示：】 ${res.data.message}`);
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
        Toast({
          message: `【M=${url}】【错误原因：】 ${err}`,
          position: 'bottom',
          duration: 1500
        });
      }
      if(self) {
        setTimeout(()=>{
          self.time=0;
        },500)
      }
      Indicator.close();
    });
  }
  
  const get = (url, params, callback, type, self)=> {
    return apiAxios('GET', url, params, callback, type,self);
  };
  const post = (url, params, callback, type, self)=> {
    return apiAxios('POST', url, params, callback, type,self);
  };

  export default {
    get,
    post
  }