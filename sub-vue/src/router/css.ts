import { RouteRecordRaw } from 'vue-router'

const cssRoutes: RouteRecordRaw[] = [
  {
    path: 'css1',
    name: 'css',
    component: () => import('../views/css/delayed.vue'),
    meta: {
      title: '延时',
    }
  }
]

export default cssRoutes