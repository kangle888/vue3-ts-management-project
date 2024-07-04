import hyRequest from '@/service/index'
import type { IAccount } from '@/types'

export const accountLoginRequest = (account: IAccount) => {
  return hyRequest.post({
    url: '/user/login',
    data: account
  })
}

export const getUserInfoById = (id: number) => {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

/**
 * 角色菜单
 */
export const getUserMenusByRoleId = (id: number) => {
  return hyRequest.get({
    url: '/role/' + id + '/menu'
  })
}
