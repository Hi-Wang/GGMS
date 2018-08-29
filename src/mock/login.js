import { param2Obj } from 'assets/js/common';

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    routers: [
      {
        name: '商品',
        id: '1',
        parentID: '0',
        children: [
          {
            name: '所有商品',
            id: '2213',
            parentName: '首页'
          }
        ]
      }
    ]
  },
  editor: {
    roles: ['other'],
    token: 'other',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    routers: [
      {
        title: '订单',
        children: [
          {
            title: '所有订单'
          }
        ]
      },
      {
        title: '供应商',
        children: [
          {
            title: '供应商管理1'
          }
        ]
      },
      {
        title: '商品',
        children: [
          {
            title: '所有商品',
            id: '222'
          }
          // {
          //   title: '供应商商品',
          //   id: '222'
          // }
        ]
      }
    ]
  },
  wang: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    routers: [
      {
        title: '商品',
        children: [
          {
            title: '供应商商品'
          }
        ]
      },
      {
        title: '供应商',
        children: [
          {
            title: '供应商管理1'
          },
          {
            title: '供应商管理2'
          }
        ]
      }
    ]
  }
};

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body);
    return userMap[username];
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return false;
    }
  },
  logout: () => 'success'
};
