<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="contact-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Notify } from 'vant'
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
