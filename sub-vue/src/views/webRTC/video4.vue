<script setup lang="ts">
import {ref} from "vue";
import {captureFrame} from './components/captureFrame.ts';

const fileChange = async (e: Event) => {
  const inputElement = e.target as HTMLInputElement
  const file = inputElement.files?.[0]
  const {url} = await captureFrame(file!, 2)
  previewUrl.value = url
}

const previewUrl = ref<string>('')
</script>

<template>
  <div class="container">
    <h3>测试：</h3>
    <div>
      <input type="file" @change="fileChange" />
    </div>
    <h3>结果：</h3>
    <div>
      <img :src="previewUrl" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 40px 20px;

  img {
    max-width: 40%;
  }
}
</style>