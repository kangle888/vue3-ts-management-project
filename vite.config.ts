import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
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
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
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
    })
  ]
  viteEnv.VITE_USE_MOCK &&
    vitePlugins.push(
      viteMockServe({
        mockPath: '@mock/api',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
        import { setupProdMockServer } from './mock'
        setupProdMockServer()
      `
      })
    )

  return vitePlugins
}
