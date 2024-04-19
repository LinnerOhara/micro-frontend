import { RouteRecordRaw } from 'vue-router'

const abilityRoutes: RouteRecordRaw[] = [
  {
    path: 'watermark',
    name: 'watermark',
    component: () => import('../views/ability/watermark.vue'),
    meta: {
      title: '水印',
    }
  }
]

export default abilityRoutes