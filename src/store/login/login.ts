import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localStorage.getItem(LOGIN_TOKEN) || '',
    userInfo: {},
    userMenus: []
  }),
  getters: {
    // 可以通过 this.$store.login.getToken 访问
  },
  actions: {
    async loginAccountAction(account: IAccount) {
      //1、 登录逻辑
      const loginResult = await accountLoginRequest(account)
      const { id, name } = loginResult
      this.token = loginResult.token

      // 2、 保存登录信息到本地
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 3、 获取登录用户(role)详细信息
      const userInfo = await getUserInfoById(id)
      this.userInfo = userInfo.data
      // 4、根据角色获取菜单（菜单menu）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data
      // 5、跳转到首页
      router.push('/main')
    }
  }
})

export default useLoginStore
