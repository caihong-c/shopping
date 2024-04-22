# shopping

- 基本功能

基于vue2和vant2组件库的智慧商城，实现了登陆功能、首页和分类页的商品展示，购物车页面和提交订单的订单结算页面，个人中心我的页面，
可以浏览商品详情，添加商品到购物车，也可以选择立即购买，并跳转的订单结算页面进行支付，支付完成可以跳转到订单页面，并显示待发货状态，
在我的页面可以退出登陆。

- 技术实现

使用postcss插件，实现项目vw适配，自动将px转换为vw

axios二次封装，便于维护使用

api接口模块，封装请求函数，对请求进行统一管理，实现请求与页面逻辑分类

storage存储模块，实现vuex持久化处理

全局前置守卫，进行页面访问拦截，只有登陆了的用户才可以进行加入购物车以及立即购买，未登陆的用户则会被拦截到登陆页面

路由懒加载，提高页面加载速度

- 预览

点击dist文件夹下的index.html，可以预览实际页面

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
