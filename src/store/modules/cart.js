import { getCartList, updateCart, deleteGoods } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 获取到的商品列表数据存入仓库中
    updateCart (state, newList) {
      state.cartList = newList
    },
    // 当前点击的商品
    handleSelect (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.ischecked = !goods.ischecked
    },
    // 全选、取消全选
    cancelSelectAll (state, checkSelect) {
      state.cartList.forEach(item => { item.ischecked = checkSelect })
    },
    // 本地修改商品数量
    changeCount (state, obj) {
      const goods = state.cartList.find(item => item.goods_id === obj.goodsId)
      goods.goods_num = obj.goodsNum
    }

  },
  actions: {
    // 获取商品列表数据
    async getCartActions (context) {
      const res = await getCartList()
      // console.log(res)
      // 获取到的数据中不包含复选框的状态，需要手动给每一项添加ischecked状态，标记商品是否选中
      res.data.list.forEach(element => {
        element.ischecked = true
      })
      context.commit('updateCart', res.data.list)
    },
    // 更新购物车商品数量
    async changeCount (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      // 先同步到本地
      context.commit('changeCount', { goodsId, goodsNum })
      // 再同步到后台
      await updateCart(goodsId, goodsNum, goodsSkuId)
    },
    // 删除购物车商品
    async deleteGoods (context) {
      const cartsId = context.getters.getCartChecked.map(item => item.id)
      await deleteGoods(cartsId)
      Toast('删除成功')

      // 重新渲染购物车列表
      context.dispatch('getCartActions')
    }
  },
  getters: {
    // 获取购物车列表商品总数
    getCartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 获取购物车列表选中的商品
    getCartChecked (state) {
      return state.cartList.filter(item => item.ischecked)
    },
    // 获取购物车列表选中的商品数量
    getCartCheckedTotal (state, getters) {
      return getters.getCartChecked.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 计算选中商品的总价，保留两位小数
    culCartChecked (state, getters) {
      return getters.getCartChecked.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 判断是否全选
    checkSelectAll (state) {
      return state.cartList.every(item => item.ischecked === true)
    }
  }
}
