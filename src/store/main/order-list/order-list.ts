import { defineStore } from 'pinia'
import type { IOrder,orderListInParams } from '@/types/order-list'
import { getOrderList } from '@/service/main/system/order-list'

const useOrderListStore = defineStore('orderList', {
  state: () : IOrder  => ({
    orderList: [] ,
    currendPage: 1,
    pageSize: 10,
  }),
  actions: {
    // 获取订单列表
    async getOrderList(params: orderListInParams) {
      const res = await getOrderList(params)
      console.log(res, '--------------')
      this.orderList = res.data
    }
  }
})

export default useOrderListStore
