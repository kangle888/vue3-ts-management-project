import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: ''
  }),
  getters: {
    // 可以通过 this.$store.login.getToken 访问
  },
  actions: {
    async loginAccountAction(account: any) {
      const loginResult = await accountLoginRequest(account)
    }
  }
})

export default useLoginStore
