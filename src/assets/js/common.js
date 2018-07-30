// 公用的方法

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  }
  
  /**
   * 获取localStorage
   */
const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
  }
  
  /**
   * 删除localStorage
   */
const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
  }

  /**
   * 验证正整数
   */
const isuInteger = (num) => {
    if (!/^[1-9]+\d*$/.test(num)) {
    //   Toast({
    //     message: "请输入正整数！",
    //     position: "bottom",
    //     duration: 1500
    //   });
      return false;
    }
    return true;
  }

  /**
   * 验证手机号
   */
  
const isPhone= e =>{
    let integer1 = /^1\d{10}$/;
    // let integer2 = /^0\d{2,3}-?\d{7,8}$/;;
    if(!integer1.test(e)){
    //   Toast({
    //     message: "手机号码格式不正确!",
    //     position: "bottom",
    //     duration: 1500
    //   });
      return false;
    }
    return true;
  }
  
  //验证邮箱
const isEmail= e=> {
    let szReg=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
    if(!szReg.test(e)){
      Toast({
        message: "邮箱格式不正确!",
        position: "bottom",
        duration: 1500
      });
      return false;
    }
    return true;
  }  
  

  export default {
    setStore,
    getStore,
    removeStore,
    isuInteger
  }