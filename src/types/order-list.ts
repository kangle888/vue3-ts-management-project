export interface IOrder {
  currendPage: number
  pageSize: number
  orderList: orderListOutParams[];
}



export interface orderListInParams  {
  transactionId? : string
  merchantTradeNo ?: string
  timeRange?: any[]
  orderStateGroup ?: number
  page: number
  pageSize: number
}

export interface orderListOutParams {
  id: string
  merchantTradeNo: string
  transactionId: string
  paidAmount: string
  payTime: string
  orderState: number
}
