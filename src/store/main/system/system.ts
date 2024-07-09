import { defineStore } from 'pinia'

interface ISystemState {
  userList: any[]
  userTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0
  }),
  actions: {
    // 获取用户列表
    getUserListAction() {
      console.log('获取用户列表')
    }
  }
})
