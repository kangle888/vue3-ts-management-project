/**
 * @description 订单列表相关请求
 * @date: 2024-7-24
 *
 */


import hyRequest from '@/service/index'
import type {orderListInParams,confirmDeliveryInParams,cancelDeliveryInParams,refundInParams } from '@/types/order-list'


// 获取订单列表
export const getOrderList = (data: orderListInParams) => {
  return hyRequest.post< {
    code: number,
    msg: string,
    data: []
  }>({
    url: '/youthBoost/admin/getOrderList',
    data
  })
}

/**
 * @description 退款
 */
export const refund = (data: refundInParams) => {
  return hyRequest.post< {
    code: number,
    msg: string,
    data: []
  }>({
    url: '/youthBoost/admin/refund',
    data
  })
}

/**
 * @description 取消发货
 */
export const cancelDelivery = (data: cancelDeliveryInParams) => {
  return hyRequest.post< {
    code: number,
    msg: string,
    data: []
  }>({
    url: '/youthBoost/admin/cancelShipment',
    data
  })
}

/**
 * @description 确认发货
 */
export const confirmDelivery = (data: confirmDeliveryInParams) => {
  return hyRequest.post< {
    code: number,
    msg: string,
    data: []
  }>({
    url: '/youthBoost/admin/shipment',
    data
  })
}
