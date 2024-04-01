import type { RouteObject } from 'react-router-dom'

export const abilityRoute: RouteObject = {
  path: '/ability',
  children: [
    {
      path: 'virtual-list',
      element: <div>虚拟列表</div>
    }
  ]
}
