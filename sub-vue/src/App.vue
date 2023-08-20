<script setup lang="ts">
import Menu from './layout/menu/index.vue'
import { RouterView } from 'vue-router'
import { Layout, LayoutContent } from 'ant-design-vue'

</script>

<template>
  <Layout class="h-screen w-screen" has-sider>
    <Menu></Menu>
    <LayoutContent>
      <RouterView></RouterView>
    </LayoutContent>
  </Layout>
</template>

<style scoped lang="scss">
</style>
