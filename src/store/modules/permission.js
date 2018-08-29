import { asyncRouterMap, constantRouterMap } from '@/router';
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(getRoute, route) {
  if (route.meta.title) {
    return getRoute.some((item, index) => route.meta.title.indexOf(getRoute[index].title) !== -1);
  } else {
    console.log('没有title');
    return false;
  }
}

function childPermission(getRoute, routes) {
  if (routes.meta.title) {
    for (let i = 0; i < getRoute.length; i++) {
      if (getRoute[i].children && getRoute[i].children.length) {
        for (let c = 0; c < getRoute[i].children.length; c++) {
          if (routes.meta.title.indexOf(getRoute[i].children[c].title) !== -1) {
            return routes;
          }
        }
      }
    }
  }
};

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(asyncRouterMap, getRoute) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(getRoute, route)) {
      if (route.children && route.children.length) {
        let routeChildArr = [];
        for (let i = 0; i < route.children.length; i++) {
          if (childPermission(getRoute, route.children[i])) {
            routeChildArr.push(childPermission(getRoute, route.children[i]));
          };
        }
        route.children = routeChildArr;
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const {roles} = data.roles;
        const routers = data.roles.routers;
        let accessedRouters;
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, routers);
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
