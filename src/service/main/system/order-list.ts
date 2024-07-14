// 获取订单列表

import hyRequest from '@/service/index'
import type {orderListOutParams,orderListInParams} from '@/types/order-list'

export const getOrderList = (data: orderListInParams) => {
  return hyRequest.post< {
    code: number,
    msg: string,
    data: orderListOutParams[]
  }>({
    url: '/youthBoost/mchGetOrdeList',
    data
  })
}
