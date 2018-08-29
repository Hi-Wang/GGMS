// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'assets/style/reset.scss';
import 'assets/style/index.scss';

import App from './App';
import router from './router';
import store from './store';

// import $ from 'jquery';
import vuei18n from 'vue-i18n' ;
import './permission';
import './mock';

import * as filters from 'assets/js/filters';

Vue.use(ElementUI);
Vue.use(vuei18n);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
