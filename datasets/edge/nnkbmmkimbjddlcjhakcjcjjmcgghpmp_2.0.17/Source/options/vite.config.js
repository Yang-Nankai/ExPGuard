import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
    server: {
          prot:"5173",
          proxy: {
            '/app': {
            target: 'https://test.askgo.ai',
            changeOrigin: true,
            }
        },
    cors: {
      origin: [
        /chrome-extension:\/\//,
      ],
    }
    },
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ],
  // 核心：设置为相对路径，适配扩展的资源加载
  base: './', 
  build: {
    minify: false, 
    terserOptions: {
      mangle: false, // 禁止变量名混淆
      compress: {
        drop_console: false,
        collapse_vars: false
      },
      output: {
        comments: true, // 保留注释
        ascii_only: false
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    // 禁用 CSS 代码分割（避免扩展加载异常）
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      // 设置@为src目录的别名
      '@': path.resolve(__dirname, './src'),
      '@common': path.resolve(__dirname, '../../common')
    }
  }, define: {
    '__INTLIFY_JIT_COMPILATION__': JSON.stringify(true)
  }
})