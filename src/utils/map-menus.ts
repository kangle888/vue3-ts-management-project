import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 重要：动态添的添加路由
  const localRoutes: RouteRecordRaw[] = []
  // 1.1 读取router/main下的所有文件
  const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {
    eager: true
  })
  // 1.2 遍历文件，动态添加路由
  for (const path in files) {
    const module = files[path]
    localRoutes.push(module.default)
  }
  return localRoutes
}

// 2.根据菜单去匹配路由
export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  // 1 读取router/main下的所有文件
  const localRoutes: RouteRecordRaw[] = loadLocalRoutes()
  // 3.根据菜单去匹配路由
  const routes: RouteRecordRaw[] = []

  const _recurseGetRoute = (userMenus: any[]) => {
    for (const menu of userMenus) {
      for (const submenu of menu.children) {
        const route = localRoutes.find((route) => route.path === submenu.url)
        if (route) {
          routes.push(route)
        }
        // 将第一个匹配的路由作为默认路由
        if (!firstMenu && route) {
          firstMenu = route
        }
      }
    }
    return routes
  }
  return _recurseGetRoute(userMenus)
}

/**
 * @desc 根据路径匹配菜单
 * @param userMenus  用户菜单
 * @param path  需要匹配的路径
 * @returns
 */
export function pathMapToMenu(userMenus: any[], path: string) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}
