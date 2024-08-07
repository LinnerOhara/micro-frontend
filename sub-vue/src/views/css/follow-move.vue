<script setup lang="ts">
import { ref } from 'vue'


const pointerStyle  = ref<{
  x: number
  y: number
  s: number
}>({
  x: 0,
  y: 0,
  s: 0
})

const imgMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLImageElement
  pointerStyle.value.x = target.offsetLeft
  pointerStyle.value.y = target.offsetTop
  pointerStyle.value.s = target.offsetWidth
}
</script>

<template>
  <div class="container">
    <div class="box">
      <div class="pointer" :style="{
        '--x': pointerStyle.x + 'px',
        '--y': pointerStyle.y + 'px',
        '--s': pointerStyle.s + 'px'
      }"></div>
      <div v-for="i in 10" class="box-item">
        <img @mouseover="imgMouseOver" :key="i" :src="'https://picsum.photos/id/' + i * 100 + '/400/400'" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  padding: 20px;
  background-image: linear-gradient(45deg, #000000, #f5f5f5);

  .box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .pointer {
      position: absolute;
      --l: 30px; // 长度
      --g: 15px; // 间隙
      --t: 3px; // 粗细
      --s: 200px; // 框住的元素大小
      --x: 0px;
      --y: 0px;
      width: calc(var(--s) + var(--g) * 2);
      height: calc(var(--s) + var(--g) * 2);
      left: calc(var(--x) - var(--g));
      top: calc(var(--y) - var(--g));
      transition: 0.5s;
      border: var(--t)solid white;
      mask: conic-gradient(
        at var(--l) var(--l),
        transparent 75%,
        red 75%
      ) 0 0 / calc(100% - var(--l)) calc(100% - var(--l));
    }
  }
}
</style>