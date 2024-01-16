import { HomeOutlined, BorderOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const menuData = [
  {
    path: '/',
    name: '首页',
    icon: () => h(HomeOutlined),
  },
  {
    path: '/canvas',
    name: '画布',
    icon: () => h(BorderOutlined),
    children: [
      {
        path: '/canvas/plum',
        name: '梅花'
      }
    ]
  },
  {
    path: '/webRTC',
    name: 'webRTC',
    icon: () => h(BorderOutlined),
    children: [
      {
        path: '/webRTC/video1',
        name: '视频1'
      },
      {
        path: '/webRTC/video2',
        name: '获取视频第一帧画面'
      },
      {
        path: '/webRTC/video3',
        name: '视频切片上传'
      }
    ]
  }
]

export default menuData