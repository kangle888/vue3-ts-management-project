import type { MockMethod } from 'vite-plugin-mock'
const users = [
  {
    username: 'admin1',
    password: '123456',
    token: 'admin',
    info: {
      username: '系统管理员'
    }
  },
  {
    username: 'editor',
    password: '123456',
    token: 'editor',
    info: {
      username: '编辑人员'
    }
  },
  {
    username: 'test',
    password: '123456',
    token: 'test',
    info: {
      username: '测试人员'
    }
  }
]
export default [
  {
    url: `/mock/user/login`,
    method: 'post',
    response: ({ body }) => {
      const user = users.find((user) => {
        return body.username === user.username && body.password === user.password
      })
      if (user) {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token: user.token,
            id: 1
          }
        }
      }
    }
  },
  {
    url: /\/mock\/users\/\d+/, // 使用正则表达式匹配动态参数
    method: 'get',
    response: ({ url }) => {
      const id = url.split('/').pop() // 提取 URL 中的 id
      console.log('id:', id)
      return {
        code: 200,
        msg: 'success',
        data: {
          id: 1,
          username: 'coderwhy'
        }
      }
    }
  }
] as MockMethod[]
