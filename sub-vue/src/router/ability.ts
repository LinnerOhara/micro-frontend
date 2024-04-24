import { RouteRecordRaw } from 'vue-router'

const abilityRoutes: RouteRecordRaw[] = [
  {
    path: 'watermark',
    name: 'watermark',
    component: () => import('../views/ability/watermark.vue'),
    meta: {
      title: '水印',
    }
  },
  {
    path: 'contextmenu',
    name: 'contextmenu',
    component: () => import('../views/ability/contextmenu.vue'),
    meta: {
      title: '右键菜单',
    }
  }
]

export default abilityRoutes