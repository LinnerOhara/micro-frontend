<script setup lang="ts">
import XScroll from './components/XScroll.vue'
</script>

<template>
  <div class="container">
    <XScroll>
      <div class="card-list">
        <div class="card" v-for="i in 10" :key="i">
          <img src="https://picsum.photos/400" alt="picsum">
        </div>
      </div>
    </XScroll>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 440px;

  .card-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>