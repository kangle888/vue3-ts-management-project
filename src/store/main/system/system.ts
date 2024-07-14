import { defineStore } from 'pinia'

interface IOrder {
  currendPage: number
  pageSize: number
  orderList: []
}

const orderListStore = defineStore('system', {
  state: () : IOrder  => ({
    orderList: [],
    currendPage: 1,
    pageSize: 10,
  }),
  actions: {
    // 获取订单列表
    async getOrderList() {
      // const res = await getOrdeList()
      // this.orderList = res.data
    }
  }
})

export default orderListStore
