import { RouteRecordRaw } from 'vue-router'

const webRTCRoutes: RouteRecordRaw[] = [
  {
    path: 'video1',
    name: 'video1',
    component: () => import('../views/webRTC/video1.vue'),
    meta: {
      title: '视频1',
    }
  }
]

export default webRTCRoutes