<script setup lang="ts">
import ContextMenu from "./components/ContextMenu.vue";

</script>

<template>
  <div>
    <ContextMenu :menu="[
        {
          label: '测试1',
          item: 'test1'
        },
        {
          label: '测试2',
          item: 'test2'
        },
        {
          label: '测试3',
          item: 'test3'
        },
    ]">
      <div class="item1"></div>
    </ContextMenu>
    <ContextMenu :menu="[
        {
          label: '测试4',
          item: 'test4'
        },
        {
          label: '测试5',
          item: 'test5'
        },
        {
          label: '测试6',
          item: 'test6'
        },
    ]">
      <div class="item2"></div>
    </ContextMenu>
  </div>
</template>

<style scoped lang="scss">
.item1 {
  height: 200px;
  background-color: #af7aaf;
  margin: 20px;
  border-radius: 8px;
}
.item2 {
  height: 200px;
  background-color: #654853;
  margin: 20px;
  border-radius: 8px;
}
</style>