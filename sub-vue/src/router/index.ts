import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import canvasRoutes from './canvas'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    }
  },
  {
    path: '/canvas',
    name: 'canvas',
    meta: {
      title: '画布'
    },
    children: canvasRoutes
  }
]

const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/sub-vue' : '/'),
  routes
})
console.log('router', router)

export default router