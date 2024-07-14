// mock/orders.js
import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const orderList = [] as any[]
const generateOrders = () => {
  const data = Mock.mock({
    'list|20-100': [
      {
        'id|+1': 1,
        merchantTradeNo: `@integer(1, 10)`,
        transactionId: `@integer(1, 20)`,
        paidAmount: '@float(100, 10000, 0, 2)',
        payTime: '@date("yyyy-MM-dd")',
        'orderState|0-5': 0
      }
    ]
  })

  orderList.push(...data.list)
}
generateOrders()

// 搜索订单列表 通过交易号
  const searchOrderList = (transactionId: string) => {

    const res = [] as any[]
    const temp = Number(transactionId)
    console.log(temp, 'temp')
    for (const item of orderList) {
      if (item.transactionId === temp) {
        res.push(item)
      }
    }
    console.log(res, 'res')
    return res
  }



export const getOrdeList = {
  url: '/mock/youthBoost/mchGetOrdeList',
  method: 'post',
  response: ({body}:{body:any}) => {
    const { transactionId } = body
    if (transactionId) {
      return {
        code: 200,
        message: '成功',
        data: searchOrderList(transactionId)
      }
    }
    return {
      code: 200,
      message: '成功',
      data: orderList
    }
  }
}

export default [getOrdeList] as MockMethod[]
