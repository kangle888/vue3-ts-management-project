import hyRequest from '@/service/index'
import type { IAccount } from '@/types'

export const accountLoginRequest = (account: IAccount) => {
  return hyRequest.post({
    url: '/user/login',
    data: account
  })
}

export const getUserInfoById = (userId: number) => {
  return hyRequest.get({
    url: `/user/role?userId=${userId}`
  })
}

/**
 * 角色菜单
 */
export const getUserMenusByRoleId = (id: number) => {
  return hyRequest.get({
    url: `user/menu/?roleId=${id}`
  })
}
