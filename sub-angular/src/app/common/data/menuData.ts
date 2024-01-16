const menuData = [
  {
    path: '/',
    name: '首页',
    icon: 'home'
  },
  {
    path: '/third-libraries',
    name: '第三方库',
    icon: 'border',
    children: [
      {
        path: '/third-libraries/exceljs',
        name: 'exceljs',
        children: [
          {
            path: '/third-libraries/exceljs/example1',
            name: '修改表头',
          }
        ]
      },
      {
        path: '/third-libraries/fabric',
        name: 'fabric',
        children: [
          {
            path: '/third-libraries/fabric/example1',
            name: '示例1',
          },
          {
            path: '/third-libraries/fabric/example2',
            name: '示例2',
          },
          {
            path: '/third-libraries/fabric/example3',
            name: '示例3',
          },
          {
            path: '/third-libraries/fabric/example4',
            name: '示例4',
          }
        ]
      }
    ]
  }
]

export default menuData
