import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from 'view/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('view/login/index'), hidden: true },
  // { path: '/authredirect', component: () => import('view/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('view/errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('view/login/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   redirect: '/documentation/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/documentation/index'),
  //     name: 'documentation',
  //     meta: { title: 'documentation', icon: 'documentation', noCache: true }
  //   }]
  // }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
