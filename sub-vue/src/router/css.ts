import { RouteRecordRaw } from 'vue-router'

const cssRoutes: RouteRecordRaw[] = [
  {
    path: 'css1',
    name: 'css',
    component: () => import('../views/css/delayed.vue'),
    meta: {
      title: '延时',
    }
  },
  {
    path: 'height-transition',
    name: 'height-transition',
    component: () => import('../views/css/height-transition.vue'),
    meta: {
      title: '高度过渡',
    }
  }
]

export default cssRoutes