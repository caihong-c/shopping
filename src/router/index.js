import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const Login = () => import('@/views/login')
const Search = () => import('@/views/search/index')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: MyOrder }
]

const router = new VueRouter({
  routes
})
// 存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
// 路由全局前置守卫，用来拦截需要权限访问的页面
router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 看to.path是否在authUrls中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
