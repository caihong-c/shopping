import request from '@/utils/request'

// 获取订单数据
export const checkedOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

// 提交订单
export const postOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 我的订单
export const getMyOrder = (dataType) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page: 1
    }
  })
}
