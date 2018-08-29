import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from 'assets/js/common';

NProgress.configure({ showSpinner: false });

// 许可判断功能
// function hasPermission(roles, permissionRoles) {
//   console.log(roles.indexOf('admin') >= 0);
//   if (roles.indexOf('admin') >= 0) {
//     return false;
//   } // 管理员权限直接传递
//   if (!permissionRoles) {
//     return true;
//   }
//   return roles.some(role => permissionRoles.indexOf(role) >= 0);
// }

const whiteList = ['/login', '/authredirect'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    //* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = {
            roles: res.data.roles,
            routers: res.data.routers
          };
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace: true });
          });
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({ path: '/' });
          });
        });
      } else {
        // console.log(store.getters.roles.length);
        next();
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next();
        // } else {
        //   next({ path: '/404', replace: true, query: { noGoBack: true } });
        // }
      }
    }
  } else {
    // has no token*/
    if (whiteList.indexOf(to.path) !== -1) { 
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
