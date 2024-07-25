import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteMockServe } from 'vite-plugin-mock'
import type { Plugin } from 'vite'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     AutoImport({
//       resolvers: [ElementPlusResolver()]
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()]
//     }),
//     createStyleImportPlugin({
//       resolves: [ElementPlusResolve()],
//       libs: [
//         {
//           libraryName: 'element-plus',
//           esModule: true,
//           resolveStyle: (name) => {
//             return `element-plus/theme-chalk/${name}.css`
//           }
//         }
//       ]
//     }),
//     viteMockServe({
//       supportTs: true,
//       logger: false,
//       mockPath: './mock/api'
//     })
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })

export default defineConfig(({ mode }) => {
  const isBuild = mode === 'production'
  const viteEnv = {
    VITE_USE_MOCK: false // Set this to false if you don't want to use mocks
  }

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://183.193.101.170:10000',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // }
    server: {
      // port: 11000, // 启动服务器的端口号
      // host: '0.0.0.0', // 启动服务器的主机名
      open: true, // 启动服务器时是否自动打开浏览器
      proxy: {
        '/api': {
          // 将匹配的请求路径代理到目标服务器
          target: 'http://10.1.200.22:12000', // 目标服务器地址
          changeOrigin: true, // 改变请求的源
          rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径
        }
      }
    }
  }
})

function createVitePlugins(viteEnv: Record<string, any>, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    }),
    visualizer({
      open: false, // 直接在浏览器中打开分析报告
      filename: 'stats.html', // 输出文件的名称
      gzipSize: true, // 显示gzip后的大小
      brotliSize: true // 显示brotli压缩后的大小
    })
  ]
  viteEnv.VITE_USE_MOCK &&
    vitePlugins.push(
      viteMockServe({
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
        import { setupProdMockServer } from '../mockProdServer';
        setupProdMockServer();
      `
      })
    )

  return vitePlugins
}
