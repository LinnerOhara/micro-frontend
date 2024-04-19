<script setup lang="ts">
import useWatermarkBg from './useWatermarkBg.ts'
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'watermark'
  },
  fontSize: {
    type: Number,
    default: 20
  },
  gap: {
    type: Number,
    default: 20
  }
})

const bg = useWatermarkBg(props)
const parent = ref<HTMLDivElement>()
let div: HTMLDivElement;

function resetWatermark() {
  if (!parent.value) {
    return
  }
  if (div) {
    div.remove()
  }
  const { base64, size } = bg.value
  div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.backgroundImage = `url(${base64})`
  div.style.backgroundSize = `${size}px`
  div.style.backgroundRepeat = 'repeat'
  div.style.zIndex = '9999'
  div.style.pointerEvents = 'none'
  div.style.inset = '0'
  parent.value.appendChild(div)
}

const ob = new MutationObserver((entries) => {
  for (const entry of entries) {
    for (const node of entry.removedNodes) {
      if (node === div) {
        resetWatermark()
      }
    }

    if (entry.target === div) {
      resetWatermark()
    }
  }
})
onMounted(() => {
  resetWatermark()
  ob.observe(parent.value!, {
    childList: true,
    subtree: true,
    attributes: true
  })
})

onUnmounted(() => {
  ob.disconnect()
})
</script>

<template>
  <div class="watermark-container" ref="parent">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.watermark-container {
  position: relative;
}
</style>