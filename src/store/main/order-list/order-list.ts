import { defineStore } from 'pinia'
import type { IOrder, orderListInParams } from '@/types/order-list'
import { getOrderList } from '@/service/main/system/order-list'

const useOrderListStore = defineStore('orderList', {
  state: (): IOrder => ({
    orderList: [],
    currendPage: 1,
    pageSize: 10,
    loading: false
  }),
  actions: {
    // 获取订单列表
    async getOrderList(params: orderListInParams) {
      this.loading = true
      try {
        const res = await getOrderList(params)
        console.log(res, '--------------')
        this.orderList = res.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
})

export default useOrderListStore
