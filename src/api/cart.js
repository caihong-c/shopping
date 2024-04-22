import request from '@/utils/request'

// 添加商品到购物车
export const postCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车总数量
export const getCartNum = () => {
  return request.get('/cart/total')
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const updateCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const deleteGoods = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
