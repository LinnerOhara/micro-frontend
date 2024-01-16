<template>
  <div class="container">
    <h3>测试：</h3>
    <div>
      <!-- <input type="file" accept="video/*" capture="environment" @change="fileChange" /> -->
      <button @click="startUpload">点击唤起上传</button>
    </div>
    <h3>结果：</h3>
    <div>

    </div>
  </div>
</template>

<script setup lang="ts">
// 创建 Service Worker
const worker = new Worker("/service-worker.js");

worker.addEventListener("message", (event) => {
  console.log(event)
})

const startUpload = () => {
  let input = document.createElement('input')
  input.type = 'file'
  input.accept = 'video/*'
  input.capture = 'environment'
  input.onchange = fileChange
  input.click()
  setTimeout(() => {
    input.remove()
  }, 0)
}

const upload = async (file: File) => {
  const chunkSize = 1024 * 1024;

  const totalChunks = Math.ceil(file.size / chunkSize);

  // 发送文件信息给 Service Worker
  worker.postMessage({ type: "init", file: file, totalChunks, notes: JSON.stringify({}) });

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * chunkSize;
    const end = Math.min((chunkIndex + 1) * chunkSize, file.size);
    const chunk = file.slice(start, end);

    worker.postMessage({ type: "upload", chunk, chunkIndex })
  }

  worker.postMessage({ type: "merge" })
}

const fileChange = async (e: Event) => {
  const inputElement = e.target as HTMLInputElement
  const file = inputElement.files?.[0]
  upload(file!)
}
</script>

<style lang="scss">
.container {
  padding: 40px 20px;
}
</style>