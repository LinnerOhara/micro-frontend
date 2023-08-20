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
  }
]

export default menuData