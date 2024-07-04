import hyRequest from '@/service/index'

/**
 * @description 获取用户列表
 */

export const getUserList = (data: any) => {
  return hyRequest.post({
    url: '/user/userList',
    data
  })
}
