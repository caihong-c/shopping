import { setInfo, getInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    // 设置个人信息
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 重置个人信息
      context.commit('setUserInfo', {})
      // 重置cart模块
      context.commit('Cart/updateCart', [], { root: true })
    }
  }
}
