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
      name: '首页',
      meta: { title: '首页', icon: 'iconfont icon-chongwuroudian', noCache: true }
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
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('view/svg-icons/index'),
      name: 'icon',
      meta: { title: '图标', icon: 'iconfont icon-chongwuroudian', noCache: true }
    }]
  },
  {
    path: '/icon',
    component: Layout,
    name: 'iconss',
    meta: {
      title: '拷贝图标',
      icon: 'iconfont icon-chongwuroudian'
    },
    children: [{
      path: 'index',
      component: () => import('view/svg-icons/index'),
      name: 'icon',
      meta: { title: '图标1', icon: 'iconfont icon-chongwugou', noCache: true }
    },{
      path: 'index',
      component: () => import('view/svg-icons/index'),
      name: 'icon',
      meta: { title: '图标2', icon: 'iconfont icon-chongwuroudian', noCache: true }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

