// 此处用于存放所有登陆相关的接口请求

import request from '@/utils/request'

// 获取图形验证码
export const getpicCode = () => {
  return request.get('/captcha/image', { headers: { platform: 'APP' } })
}

// 获取短信验证码
export const getmobileCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: [
      captchaCode,
      captchaKey,
      mobile
    ]
  },
  {
    headers: { platform: 'H5' }
  })
}

// 登录请求
export const postlogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
