import { RouteRecordRaw } from 'vue-router'

const canvasRoutes: RouteRecordRaw[] = [
  {
    path: 'plum',
    name: 'plum',
    component: () => import('../views/canvas/plum.vue'),
    meta: {
      title: '梅花',
    }
  },
  {
    path: 'clock',
    name: 'clock',
    component: () => import('../views/canvas/clock.vue'),
    meta: {
      title: '粒子时钟',
    }
  }
]

export default canvasRoutes