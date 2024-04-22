import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建axios实例
const instance = axios.create({
  // baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api/',
  timeout: 5000
})

// 自定义配置
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    duration: 0
  })

  // 只要有token，就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'APP'
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.data.status !== 200) {
    Toast('response.data.message')
    return Promise.reject(response.data.message)
  } else {
    Toast.clear()
  }
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default instance
