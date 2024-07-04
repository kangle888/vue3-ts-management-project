import { Menu } from '@element-plus/icons-vue'
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

  const _recurseGetRoute = (userMenus: any[]) => {
    for (const menu of userMenus) {
      for (const submenu of menu.children) {
        const route = localRoutes.find((item) => item.path === submenu.url)
        if (route) {
          // 1、给route的顶层菜单增加重定向(但是只需添加一次即可)
          if (!routes.find((item) => item.path === menu.path)) {
            routes.push({ path: menu.url, redirect: route.path })
          }
          // 2、将二级菜单的路由添加到routes中
          routes.push(route)
        }
        // 将第一个匹配的路由作为默认路由
        if (!firstMenu && route) {
          firstMenu = submenu
          console.log(firstMenu, 'firstMenu')
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

/**
 * @desc 面包屑的路径
 * @param userMenus  用户菜单
 * @param path  当前路径
 */

export const mapPathToBreadcrumbs = (path: string, userMenus: any[]) => {
  const breadcrumb: any[] = []
  _recursePathMapToBreadcrumb(userMenus, path)

  function _recursePathMapToBreadcrumb(userMenus: any[], path: string) {
    for (const menu of userMenus) {
      if (menu.children) {
        for (const submenu of menu.children) {
          if (submenu.url === path) {
            // 先将子菜单加入到 breadcrumb
            breadcrumb.unshift({ path: submenu.url, name: submenu.name })

            // 如果有父级菜单，递归
            if (menu.url) {
              _recursePathMapToBreadcrumb(userMenus, menu.url)
            }
            return
          }
        }
      }

      // 如果当前菜单就是所要查找的路径，直接加入 breadcrumb
      if (menu.url === path) {
        breadcrumb.unshift({ path: menu.url, name: menu.name })
        return
      }
    }
  }

  return breadcrumb
}
