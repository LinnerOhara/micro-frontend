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
  },
  {
    path: 'audio',
    name: 'audio',
    component: () => import('../views/canvas/audio.vue'),
    meta: {
      title: '音频可视化',
    }
  }
]

export default canvasRoutes