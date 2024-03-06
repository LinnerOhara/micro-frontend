<script setup lang="ts">
import { ref } from 'vue'

const delay = ref<number>(0)
const onInput = (e: Event) => {
  const inputEl = e.target as HTMLInputElement
  console.log(inputEl?.value)
  delay.value = Number(inputEl.value)
}
</script>

<template>
  <div class="container">
    <div class="ball" :style="{ '--delay': -delay + 's' }"></div>
    <input type="range" @input="onInput" min="0" max="1" step="0.01" value="0">
  </div>
</template>

<style scoped lang="scss">
.container {
 padding: 20px;
}
.ball {
  --delay: 0s;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
  margin-bottom: 50px;
  animation: move linear forwards 1s paused;
  animation-delay: var(--delay);
}
@keyframes move {
  50% {
    transform: translateX(100px) scale(1.5);
  }
  to {
    transform: translateX(200px) scale(1);
  }
}
.eye {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 50px;
  background-color: #fff;
  animation: eyeChange 1s var(--delay) linear forwards paused;
}
@keyframes eyeChange {
  0% {
    clip-path: polygon(0 70%, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0%, 100% 0, 100% 100%, 0 100%);
  }
}
@keyframes mouthChange {
  50% {
    height: 4px;
    box-shadow: inset 0 4px 0 #fff;
    transform: translateY(40px);
    clip-path: inset(0% 0% 0% 0%);
  }
  50.1% {
    height: 4px;
    box-shadow: inset 0 -4px 0 #fff;
    transform: translateY(40px);
    clip-path: inset(50% 0% 0% 0%);
  }
  to {
    height: 80px;
    box-shadow: inset 0 -50px 0 #fff;
    transform: translateY(0);
    clip-path: inset(50% 0% 0% 0%);
  }
}
</style>