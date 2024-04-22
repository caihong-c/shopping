import request from '@/utils/request'

// 获取商品详情页数据
export const getDetail = (id) => {
  return request.get('/goods/detail', {
    params: {
      goodsId: id
    }
  })
}

// 获取商品评论
export const getComment = (goodsId, num) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId: goodsId,
      limit: num
    }
  })
}

// 获取商品评价总数
export const getComNum = (goodsId) => {
  return request.get('/comment/total', {
    params: {
      goodsId: goodsId
    }
  })
}

// 获取商品评价列表
export const getComList = (obj) => {
  const { scoreType, goodsId, page } = obj
  return request.get('/comment/list', {
    params: {
      scoreType,
      goodsId,
      page
    }
  })
}
