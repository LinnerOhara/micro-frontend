<script setup lang="ts">
import { ref } from 'vue'

const loadVideo = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const videoElement = document.createElement('video')
    videoElement.src = url
    videoElement.addEventListener('loadedmetadata', () => {
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight
      const context = canvas.getContext('2d')
      context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

      // const imageUrl = canvas.toDataURL('image/jpeg', { alpha: true })
      canvas.toBlob((blob: any) => {
        resolve(blob)
      },
      "image/jpeg")
    })
  })
}

const fileChange = async (e: Event) => {
  const inputElement = e.target as HTMLInputElement
  const file = inputElement.files?.[0]
  if (file) {
    const videoUrl = URL.createObjectURL(file)
    const res = await loadVideo(videoUrl)
    console.log(res)
    URL.revokeObjectURL(videoUrl)
    previewUrl.value = res
  }
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
    max-width: 80%;
  }
}
</style>