<script setup lang="ts">
import { Menu } from 'ant-design-vue'
import type { VNode, RendererNode, RendererElement } from 'vue'

type MenuData = {
  icon?: () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
  }>
  path: string
  name: string,
  children: MenuData[]
}

export interface Props {
  menuData: MenuData[]
}

const props = withDefaults(defineProps<Props>(), {
  menuData: () => ([] as MenuData[])
})
</script>

<template>
  <template v-for="item in props.menuData">
    <template v-if="item.children && item.children.length" :key="item.children">
      <Menu.SubMenu
        :icon="item.icon"
        :key="item.path"
        :title="item.name">
        <subMenu :menu-data="item.children"></subMenu>
      </Menu.SubMenu>
    </template>
    <Menu.Item v-else-if="item.name"
      :title="item.name"
      :icon="item.icon"
      :key="item.path">
      {{ item.name }}
    </Menu.Item>
  </template>
</template>