import request from '@/utils/request'

// 获取省市区
export const getposition = () => {
  return request.get('/region/tree')
}

// 添加收货地址
export const setAddress = () => {
  return request.post('/address/add', {
    form: {
      name: '陈老板',
      phone: '18752683907',
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail: '北京路1号楼8888室'
    }
  })
}

// 获取收货地址
export const getAddress = () => {
  return request.get('/address/list')
}
