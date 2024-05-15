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
  },
  {
    path: 'x-scroll',
    name: 'x-scroll',
    component: () => import('../views/ability/xScroll.vue'),
    meta: {
      title: '横向滚动',
    }
  }
]

export default abilityRoutes