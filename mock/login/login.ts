import type { MockMethod } from 'vite-plugin-mock'
const users = [
  {
    username: 'admin1',
    password: '123456',
    token: 'admin',
    id: 1
  },
  {
    username: 'editor',
    password: '123456',
    token: 'editor',
    id: 2
  },
  {
    username: 'test',
    password: '123456',
    token: 'test',
    id: 3
  }
]
export const accountLoginRequest = {
  url: `/mock/user/login`,
  method: 'post',
  response: ({ body }: { body: any }) => {
    const user = users.find(
      (user) => body.username === user.username && body.password === user.password
    )
    if (user) {
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: user.token,
          id: user.id
        }
      }
    }
  }
}

export const getUserByIdRequest = {
  url: '/mock/user/role',
  method: 'get',
  response: ({ url }: { url: any }) => {
    console.log('url', url)
    return {
      code: 200,
      msg: 'success',
      data: {
        id: 1,
        role: 'admin'
      }
    }
  }
}

// 获取角色菜单
export const getUserMenusByRoleId = {
  url: '/mock/user/menu',
  method: 'get',
  response: () => {
    return {
      code: 200,
      msg: 'success',
      data: [
        {
          id: 1,
          name: '系统总览',
          url: '/main/analysis',
          icon: 'Position',
          children: [
            {
              id: 2,
              name: '用户分析',
              url: '/main/analysis/dashboard'
            },
            {
              id: 3,
              name: '部门分析',
              url: '/main/analysis/overview'
            }
          ]
        },
        {
          id: 4,
          name: '用户管理',
          url: '/main/system',
          icon: 'Position',
          children: [
            {
              id: 5,
              name: '角色管理',
              url: '/main/system/role'
            },
            {
              id: 6,
              name: '用户管理',
              url: '/main/system/user'
            }
          ]
        }
      ]
    }
  }
}

export default [accountLoginRequest, getUserByIdRequest, getUserMenusByRoleId] as MockMethod[]
