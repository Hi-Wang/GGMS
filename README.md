# ggms

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


项目目录
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // API
│   │   ├── http.js            // 请求封装
│   │   └── config.js          // 服务器地址及请求地址
│   ├── assets                 // 主题 字体等静态资源
│   │   ├── custom-theme       //
│   │   ├── fonts              // 字体
│   │   ├── icons              // icon svg
│   │   ├── image              // 静态图片
│   │   ├── js                 // 公用js文件
│   │   │   ├── common.js      // 公用方法
│   │   │   ├── dom.js         // dom操作
│   │   │   ├── permission.js  // 权限管理
│   │   │   └── select.js      // 公用下拉框值
│   │   └── style              // 公用样式
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── mock                   // 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


