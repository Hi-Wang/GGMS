import Vue from 'vue';
import Router from 'vue-router';
import Layout from 'view/layout/Layout';

Vue.use(Router);

/**
 * 通用路由
 */ 
export const constantRouterMap = [
  { path: '/login', component: () => import('view/login/index'), hidden: true },
  { path: '/404', component: () => import('view/errorPage/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('view/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'iconfont icon-vip', noCache: true }
    }]
  }
];

export default new Router({
  mode: 'history', // 默认 hash 模式
  scrollBehavior: () => ({ y: 0 }), // 滚动行为
  routes: constantRouterMap
});

/**
 * 权限路由 可通过addRouters添加
 */ 
export const asyncRouterMap = [
  {
    path: '/supplier',
    component: Layout,
    meta: {
      title: '供应商',
      icon: 'iconfont icon-chongwuroudian'
    },
    children: [{
      path: '/supplierManage/supplierManage',
      component: () => import('view/supplier/supplierManage/supplierManage'),
      name: 'supplierManage',
      meta: { title: '供应商管理1', icon: 'iconfont icon-function', noCache: true }
    }, {
      path: '/supplierManage',
      component: () => import('view/supplier/supplierManage/supplierManage'),
      name: 'supplierManage2',
      meta: { title: '供应商管理2', icon: 'iconfont icon-function', noCache: true }
    }]
  },
  {
    path: '/pro',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '商品',
      icon: 'iconfont icon-shop-'
    },
    children: [{
      path: 'allPro',
      component: () => import('view/pro/allPro/allPro'),
      name: 'icon1',
      meta: { title: '所有商品', icon: 'iconfont icon-chongwugou', noCache: true }
    }, {
      path: 'supplierPro',
      component: () => import('view/pro/supplierPro/supplierPro'),
      name: 'icon2',
      meta: { title: '供应商商品', icon: 'iconfont icon-chongwuyugu', noCache: true }
    }]
  },
  {
    path: '/order',
    component: Layout,
    meta: {
      roles: ['admin'],
      title: '订单',
      icon: 'iconfont icon-xiangmuxuqiu'
    },
    children: [{
      path: 'all',
      component: () => import('view/order/allOrder/allOrder'),
      name: 'allOrder',
      meta: { title: '所有订单', icon: 'iconfont icon-xiangmuxuqiu', noCache: true }
    }]
  },
  { 
    path: '*', 
    redirect: '/404',
    meta: {
      title: '404',
      icon: 'iconfont icon-chongwuroudian'
    },
    hidden: true 
  }
];

