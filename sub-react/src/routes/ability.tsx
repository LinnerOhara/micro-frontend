import type { RouteObject } from 'react-router-dom'
import VirtualListPage from "../pages/ability/virtual-list";

export const abilityRoute: RouteObject = {
  path: '/ability',
  children: [
    {
      path: 'virtual-list',
      element: <VirtualListPage />
    }
  ]
}
