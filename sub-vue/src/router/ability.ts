import { RouteRecordRaw } from 'vue-router'

const abilityRoutes: RouteRecordRaw[] = [
    {
        path: 'virtual-list',
        name: 'virtual-list',
        component: () => import('../views/ability/virtualList.vue'),
        meta: {
            title: '虚拟列表',
        }
    }
]

export default abilityRoutes