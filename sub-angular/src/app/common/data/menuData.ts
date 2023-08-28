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
      }
    ]
  }
]

export default menuData
