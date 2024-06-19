<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="loader">
      <template v-for="i in 20" :key="i">
        <span :style="{ '--i': i }"></span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #042104;
  animation: changeColor 10s linear infinite;
}
@keyframes changeColor {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
.container .loader {
  position: relative;
  width: 120px;
  height: 120px;

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(calc(var(--i) * 18deg));

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 15px;
      height: 15px;
      background: #28c840;
      box-shadow: 0 0 10px #28c840,
        0 0 20px #28c840,
        0 0 40px #28c840,
        0 0 80px #28c840,
        0 0 100px #28c840;
      border-radius: 50%;
      animation: animate 2s linear infinite;
      animation-delay: calc(var(--i) * 0.1s);
    }
  }
}
@keyframes animate {
  0% {
    transform: scale(1);
  }
  80%, 100% {
    transform: scale(0);
  }
}
</style>