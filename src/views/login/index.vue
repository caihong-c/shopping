<template>
  <div>
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>

        <div class="form">
          <div class="form-item">
            <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
          </div>
          <div class="form-item">
            <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
            <img v-if="picUrl" :src="picUrl" @click="getpicCode" alt="">
          </div>
          <div class="form-item">
            <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
            <button ref="btnNum" @click="getNum">
              {{ this.second === this.totalsecond ? '发送验证码' : `${second}秒后重试` }}
            </button>
          </div>
        </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getpicCode, getmobileCode, postlogin } from '@/api/login'
// import { Toast } from 'vant'
export default {
  data () {
    return {
      picCode: '', // 图形验证码的base64编码
      picKey: '', // 将来请求传递的图形验证码的唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalsecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器时对second--
      time: null, // 记录定时器
      mobile: '',
      smsCode: ''
    }
  },
  created () {
    this.getpicCode()
  },
  methods: {
    // 获取图形验证码
    async getpicCode () {
      const { data: { base64, key } } = await getpicCode()
      this.picUrl = base64
      this.picKey = key
      // Toast('提示内容')
      // this.$toast('提示内容')
    },
    // 获取短信验证码
    getNum () {
      if (!this.vrifyFn()) return false

      if (!this.time && this.totalsecond === this.second) {
        this.getMobileCode(this.picCode, this.picKey, this.mobile)
        this.time = setInterval(() => {
          this.second--
          if (this.second < 1) {
            this.second = 60
            this.time = null
            clearInterval(this.time)
          }
        }, 1000)
      }
    },
    // 验证手机号，图形验证码
    vrifyFn () {
      if (!/^1[3-9]\d{9}/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/i.test(this.picCode)) {
        this.$toast('验证码有误')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getMobileCode () {
      const res = await getmobileCode()
      console.log(res)
      this.$toast(res.message)
    },
    // 验证登录
    async login () {
      if (!this.vrifyFn()) return false
      if (!/^\d{6}$/.test(this.smsCode)) return false
      const res = await postlogin(this.mobile, this.smsCode)
      this.$store.commit('User/setUserInfo', res.data)
      console.log(res)
      this.$toast(res.message)
      // 进行判断，看地址栏有无回跳地址
      // 如果有，说明是其他页面拦截过来的，需要回跳
      // 如果没有，正常去首页
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  destroyed () {
    this.time = null // 离开页面清除定时器
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
