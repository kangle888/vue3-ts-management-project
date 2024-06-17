import hyRequest from '@/service/index'

export const accountLoginRequest = (account: any) => {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
