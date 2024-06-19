<script setup lang="ts">
import { ref } from 'vue'

const animation = ref(false)

const toggle = () => {
  animation.value = !animation.value
}
</script>

<template>
  <div class="container">
    <svg width="400" height="400" :style="{
      '--i': animation ? 1 : 0,
      opacity: animation ? 1 : 0,
    }">
      <circle fill="none" stroke="#68E534" stroke-width="20"
        cy="200" cx="200" r="180" stroke-linecap="round"
        class="circle"/>
      <polyline fill="none" stroke="#68E534" stroke-width="24"
        points="80,214 173,284 304,138" stroke-linecap="round"
        stroke-linejoin="round"
        class="tick"/>
    </svg>
    <h2 @click="toggle">支付成功</h2>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
h2 {
  font-size: 24px;
  margin-top: 40px;
  color: #333;
  cursor: pointer;
}
.circle {
  stroke-dasharray: 1194;
  stroke-dashoffset: calc(1194 - calc(var(--i) * 1194));
  transform: rotate(-90deg);
  transform-origin: 200px 200px;
  transition: stroke-dashoffset 1s;
}
.tick {
  stroke-dasharray: 350;
  stroke-dashoffset: calc(350 - calc(var(--i) * 350));
  transition: stroke-dashoffset 1s;
}
</style>