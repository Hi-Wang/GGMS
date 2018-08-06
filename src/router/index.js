import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from 'view/layout/Layout'

/**
 * 通用路由
 */ 
export const constantRouterMap = [
  { path: '/login', component: () => import('view/login/index'), hidden: true },
  { path: '/404', component: () => import('view/errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('view/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'iconfont icon-vip', noCache: true }
    }]
  }
]

/**
 * 权限路由 可通过addRouters添加
 */ 
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/supplier',
    component: Layout,
    meta: {
      roles: ['admin','editor'],
      title: '供应商',
      icon: 'iconfont icon-chongwuroudian'
    },
    children: [{
      path: 'Manage',
      component: () => import('view/supplier/supplierManage/supplierManage'),
      name: 'supplierManage',
      meta: { title: '供应商管理', icon: 'iconfont icon-function', noCache: true }
    }]
  },
  {
    path: '/pro',
    component: Layout,
    name: 'iconss',
    redirect: 'noredirect',
    meta: {
      roles: ['editor', 'wang'],
      title: '商品',
      icon: 'iconfont icon-shop-'
    },
    children: [{
      path: 'index1',
      component: () => import('view/pro/allPro/allPro'),
      name: 'icon1',
      meta: { title: '所有商品', icon: 'iconfont icon-chongwugou',roles: ['editor'], noCache: true }
    },{
      path: 'index2',
      component: () => import('view/pro/supplierPro/supplierPro'),
      name: 'icon2',
      meta: { title: '供应商商品', icon: 'iconfont icon-chongwuyugu',roles: ['admin'], noCache: true }
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
  { path: '*', redirect: '/404', hidden: true }
]

