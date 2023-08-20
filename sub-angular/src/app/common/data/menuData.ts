const menuData = [
  {
    path: '/',
    name: '首页',
    icon: 'home'
  },
  {
    path: '/canvas',
    name: '画布',
    icon: 'border',
    children: [
      {
        path: '/canvas/plum',
        name: '梅花'
      }
    ]
  }
]

export default menuData
