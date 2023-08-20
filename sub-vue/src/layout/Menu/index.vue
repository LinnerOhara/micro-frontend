<script setup lang="ts">
import { LayoutSider, Menu } from 'ant-design-vue'
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import menuData from '../../router/menuData'
import SubMenu from './SubMenu.vue'

const getPaths = (path: string): string[] => {
    // 移除路径末尾的斜杠
  const normalizedPath = path.replace(/\/$/, '');

  // 拆分路径为各级部分
  const pathParts = normalizedPath.split('/').filter(part => part !== '');

  // 生成路径层级结构
  const paths = pathParts.map((part, index) => {
    const parts = pathParts.slice(0, index + 1);
    return `/${parts.join('/')}`;
  });

  if (path === '/') {
    paths.push('/');
  }

  return paths
}

const collapsed = ref<boolean>(false)
const route = useRoute()
const selectedKeys = ref<string[]>([])
const router = useRouter()

const setSelectedKeys = () => {
  selectedKeys.value = getPaths(route.path)
}

onMounted(() => {
  router.afterEach(setSelectedKeys)
})

onUnmounted(() => {
  router.afterEach(setSelectedKeys)
})

const menuItemClick = ({ key }) => {
  router.push({ path: key })
}
</script>

<template>
  <LayoutSider :style="{
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0
  }"
  v-model:collapsed="collapsed"
  collapsible
  >
    <Menu theme="dark"
      mode="inline"
      @click="menuItemClick"
      :selectedKeys="selectedKeys"
      :openKeys="selectedKeys">
      <SubMenu :menu-data="menuData"></SubMenu>
    </Menu>
  </LayoutSider>
  <div :class="!collapsed ? 'w-200px' : 'w-80px'"></div>
</template>