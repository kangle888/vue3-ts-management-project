// 假设这是一个模拟的用户信息接口
export const getUserInfoById = (
  id: number
): Promise<{ data: { id: number; username: string } }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { id, username: 'admin' } })
    }, 500) // 模拟延迟的异步操作
  })
}

// 假设这是一个模拟的菜单接口
export const getUserMenusByRoleId = async (roleId: number): Promise<{ data: any }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const menus = [
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
      resolve({ data: menus })
    }, 500) // 模拟延迟的异步操作
  })
}
