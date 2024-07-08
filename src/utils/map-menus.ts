import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 重要：动态添的添加路由
  const localRoutes: RouteRecordRaw[] = []
  // 1.1 读取router/main下的所有文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  console.log(files, 'files------------')
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

  const _recurseGetRoute = (menus: any[], parentPath?: string) => {
    for (const menu of menus) {
      if (menu.children) {
        // 如果有子菜单，递归调用自身
        _recurseGetRoute(menu.children, menu.url)
      } else {
        const route = localRoutes.find((item) => item.path === menu.url)
        if (route) {
          // 给route的顶层菜单增加重定向(但是只需添加一次即可)
          if (parentPath && !routes.find((item) => item.path === parentPath)) {
            routes.push({ path: parentPath, redirect: route.path })
          }
          // 将菜单的路由添加到routes中
          routes.push(route)
        }
        // 将第一个匹配的路由作为默认路由
        if (!firstMenu && route) {
          firstMenu = menu
          console.log(firstMenu, 'firstMenu')
        }
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
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

/**
 * @desc 面包屑的路径
 * @param userMenus 用户菜单
 * @param path 当前路径
 */

export const mapPathToBreadcrumbs = (path: string, userMenus: any[]) => {
  const breadcrumb: any[] = []
  _recursePathMapToBreadcrumb(userMenus, path)

  function _recursePathMapToBreadcrumb(menus: any[], currentPath: string): boolean {
    for (const menu of menus) {
      if (menu.url === currentPath) {
        breadcrumb.unshift({ path: menu.url, name: menu.name })
        return true
      }

      if (menu.children) {
        const found = _recursePathMapToBreadcrumb(menu.children, currentPath)
        if (found) {
          breadcrumb.unshift({ path: menu.url, name: menu.name })
          return true
        }
      }
    }
    return false
  }

  return breadcrumb
}
