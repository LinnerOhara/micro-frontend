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
      },
      {
        path: '/webRTC/video4',
        name: '提取画面帧'
      }
    ]
  },
  {
    path: '/css',
    name: 'css',
    icon: () => h(BorderOutlined),
    children: [
      {
        path: '/css/css1',
        name: 'css1'
      },
      {
        path: '/css/height-transition',
        name: '高度过渡'
      },
      {
        path: '/css/underline',
        name: '下划线'
      },
      {
        path: '/css/tick',
        name: '打勾动画'
      },
      {
        path: '/css/kaleidoscopic',
        name: '走马灯'
      }
    ]
  },
  {
    path: '/ability',
    name: '功能',
    icon: () => h(BorderOutlined),
    children: [
      {
        path: '/ability/watermark',
        name: '水印'
      },
      {
        path: '/ability/contextmenu',
        name: '右键菜单'
      },
      {
        path: '/ability/x-scroll',
        name: '横向滚动'
      }
    ]
  }
]

export default menuData