import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'
import UnoCss from 'unocss/vite'

const useDevMode = true

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    qiankun('sub-vue', {
      useDevMode
    }),
    UnoCss()
  ],
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
})
