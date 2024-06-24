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
  },
  {
    path: 'underline',
    name: 'underline-transition',
    component: () => import('../views/css/underline.vue'),
    meta: {
      title: '下划线',
    }
  },
  {
    path: 'tick',
    name: 'tick',
    component: () => import('../views/css/tick.vue'),
    meta: {
      title: '打勾动画',
    }
  },
  {
    path: 'kaleidoscopic',
    name: 'kaleidoscopic',
    component: () => import('../views/css/kaleidoscopic.vue'),
    meta: {
      title: '走马灯',
    }
  },
  {
    path: 'starry-sky',
    name: 'starry-sky',
    component: () => import('../views/css/starry-sky.vue'),
    meta: {
      title: '星空',
    }
  }
]

export default cssRoutes