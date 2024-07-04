import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  getters: {
    // 可以通过 this.$store.login.getToken 访问
  },
  actions: {
    async loginAccountAction(account: IAccount) {
      //1、 登录逻辑
      const loginRes = await accountLoginRequest(account)
      console.log('loginResult:', loginRes)
      const loginResult = loginRes.data
      const { id } = loginResult
      this.token = loginResult.token

      // 2、 保存登录信息到本地
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 3、 获取登录用户(role)详细信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      // // 4、根据角色获取菜单（菜单menu）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      // // 5、用户信息进行本地存储
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      //重要 动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 6、跳转到首页
      router.push('/main')
    },

    // 缓存动态路由
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        //重要 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      }
    }
  }
})

export default useLoginStore
