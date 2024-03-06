import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import canvasRoutes from './canvas'
import webRTCRoutes from './webRTC'
import cssRoutes from './css'

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
  },
  {
    path: '/webRTC',
    name: 'webRTC',
    meta: {
      title: 'webRTC'
    },
    children: webRTCRoutes
  },
  {
    path: '/css',
    name: 'css',
    meta: {
      title: 'CSS'
    },
    children: cssRoutes
  }
]

const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/sub-vue' : '/'),
  routes
})
console.log('router', router)

export default router