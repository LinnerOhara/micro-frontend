import { RouteRecordRaw } from 'vue-router'

const webRTCRoutes: RouteRecordRaw[] = [
  {
    path: 'video1',
    name: 'video1',
    component: () => import('../views/webRTC/video1.vue'),
    meta: {
      title: '视频1',
    }
  },
  {
    path: 'video2',
    name: 'video2',
    component: () => import('../views/webRTC/video2.vue'),
    meta: {
      title: '获取视频第一帧画面',
    }
  },
  {
    path: 'video3',
    name: 'video3',
    component: () => import('../views/webRTC/video3.vue'),
    meta: {
      title: '视频切片上传',
    }
  }
]

export default webRTCRoutes