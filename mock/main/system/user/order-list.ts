// mock/orders.js
import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const orderList = [] as any[]
const generateOrders = () => {
  const data = Mock.mock({
    'list|50-100': [
      {
        'id|+1': 1,
        merchantTradeNo: `2024062511333925944822@integer(100, 999)`,
        transactionId: `420000221420240625571753980@integer(100, 999)`,
        paidAmount: '@float(100, 10000, 0, 2)',
        payTime: '@date("yyyy-MM-dd")',
        'orderState|0-5': 0
      }
    ]
  })

  orderList.push(...data.list)
}
generateOrders()

export const getOrdeList = {
  url: '/mock/youthBoost/mchGetOrdeList',
  method: 'get',
  response: ({ body }: { body: any }) => {
    return {
      code: 200,
      message: '成功',
      data: orderList
    }
  }
}

export default [getOrdeList] as MockMethod[]
