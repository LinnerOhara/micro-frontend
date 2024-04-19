<script setup lang="ts">
import Watermark from "./components/Watermark.vue";
</script>

<template>
  <div class="container">
    <Watermark text="版权所有">
      <div class="content"></div>
    </Watermark>
    <Watermark text="禁止转载" style="background: #28c840">
      <div class="content"></div>
    </Watermark>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 100px;

  .content {
    width: 200px;
    height: 200px;
  }
}
</style>