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
  console.log('mode:', mode)
  const isBuild = mode === 'production'
  console.log('isBuild:', isBuild)
  const viteEnv = {
    VITE_USE_MOCK: true // Set this to false if you don't want to use mocks
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
    //       target: 'http://localhost:3000',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // }
    server: {
      port: 3001,
      host: '0.0.0.0',
      open: true,
      proxy: {
        // 代理配置
        '/dev': 'https://www.fastmock.site/mock/48cab8545e64d93ff9ba66a87ad04f6b/'
      }
    }
  }
})

function createVitePlugins(viteEnv: Record<string, any>, isBuild: boolean) {
  console.log('viteEnv:', viteEnv, isBuild)
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
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `
      })
    )

  return vitePlugins
}
