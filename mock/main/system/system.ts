import type { MockMethod } from 'vite-plugin-mock'

// mock用户列表 具有分页功能
const users: any = []

// mock用户列表  采用for循环生成100条数据，各个字段 采用mockjs随机生成
for (let i = 0; i < 100; i++) {
  users.push({
    date: '2016-05-02',
    name: '王小虎',
    enable: 1,
    address: '上海市普陀区金沙江路 1518 弄'
  })
}

const getUserList = {
  url: `/mock/user/list`,
  method: 'post',
  response: ({ body }: { body: any }) => {
    const { page, limit } = body
    const start = (page - 1) * limit
    const end = page * limit
    return {
      code: 200,
      message: 'success',
      data: {
        total: users.length,
        userList: users.slice(start, end)
      }
    }
  }
}
