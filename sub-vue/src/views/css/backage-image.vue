<script setup lang="ts">
</script>

<template>
  <div class="container">

  </div>
</template>

<style lang="scss" scoped>

.container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  --inner-color: #2098F60F;
  --outer-color: #00F2C10F;
  --inner-size: 3%;
  --outer-size: 10%;
  background-image: radial-gradient(circle at 20% 0%, var(--inner-color) var(--inner-size), var(--outer-color) var(--outer-size), transparent 20%),
  radial-gradient(circle at 80% 10%, var(--inner-color) var(--inner-size), var(--outer-color) var(--outer-size), transparent 20%),
  radial-gradient(circle at 0% 50%, var(--inner-color) var(--inner-size), var(--outer-color) var(--outer-size), transparent 20%),
  radial-gradient(circle at 40% 100%, var(--inner-color) var(--inner-size), var(--outer-color) var(--outer-size), transparent 20%);
}
</style>