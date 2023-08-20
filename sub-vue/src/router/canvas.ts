import { RouteRecordRaw } from 'vue-router'

const canvasRoutes: RouteRecordRaw[] = [
  {
    path: 'plum',
    name: 'plum',
    component: () => import('../views/canvas/plum.vue'),
    meta: {
      title: '梅花',
    }
  }
]

export default canvasRoutes