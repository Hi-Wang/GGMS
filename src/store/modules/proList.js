// 商品列表数据

import { getProList } from 'api/proList';
// import { getToken } from 'assets/js/common';

const user = {
  state: {
    proList: []
  },

  mutations: {  
    SET_PRO_LIST: (state, list) => {
      state.list = list;
    }
  },

  actions: {
    // 获取商品列表
    GetProList({ commit, state }) {
      return new Promise((resolve, reject) => {
        getProList(state.token).then(response => {
          // console.log(response);
          if (!response.data) {
            reject(new Error('error'));
          }
          const data = response.data.data;
          if (data && data.length > 0) {
            commit('SET_PRO_LIST', data);
          } else {
            reject(new Error('获取产品列表失败'));
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default user;
