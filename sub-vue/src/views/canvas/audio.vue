<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import videoSource from './assets/揉碎夜的光.mp3'

  const canvas = ref<HTMLCanvasElement>() 
  const audio = ref<HTMLAudioElement>() 
  const ctx = computed( () => canvas!.value!.getContext( '2d' )! );
  const isInit = ref<boolean>( false )
  const dataArray = ref<Uint8Array<ArrayBuffer>>(new Uint8Array(0))
  const analyser = ref<AnalyserNode>()

  const draw = () =>
  {
    requestAnimationFrame( draw )
    // 清空画布
    ctx.value.clearRect( 0, 0, canvas.value?.width ?? 0, canvas.value?.height ?? 0 )
    if ( !isInit.value || !canvas.value) return 
    // 让分析器节点分析出数据到数组中
    analyser.value?.getByteFrequencyData( dataArray.value )
    const len = dataArray.value.length / 2
    const width = canvas.value!.width
    const ctxHeight = canvas.value!.height
    const barWidth = width / len / 2
    ctx.value.fillStyle = '#78C6F7'
    for ( let i = 0; i < dataArray.value.length; i++ )
    {
      const data = dataArray.value[ i ] // < 256
      const height = data / 255 * ctxHeight
      const x1 = i * barWidth + width / 2
      const x2 = width / 2 - (i + 1) * barWidth
      const y = ctxHeight - height
      ctx.value.fillRect( x1, y, barWidth - 2, height )
      ctx.value.fillRect( x2, y, barWidth - 2, height )
    }
  }

  onMounted( () =>
  {
    draw()
  })
  
  const onPlay = () =>
  {
    if ( isInit.value ) return
    const audioCtx = new AudioContext() // 创建音频上下文
    const source = audioCtx.createMediaElementSource( audio.value! ) // 创建音频节点
    analyser.value = audioCtx.createAnalyser()
    analyser.value.fftSize = 512
    // 创建数据，用于分析数据
    dataArray.value = new Uint8Array(analyser.value.frequencyBinCount)
    // 快速傅里叶变换 
    source.connect( analyser.value )
    analyser.value.connect( audioCtx.destination )
    isInit.value = true
  }
</script>

<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
    <audio ref="audio" controls @play="onPlay" :src="videoSource"></audio>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: black;

  canvas {
    width: 100%;
    height: 50%;
  }
}
</style>