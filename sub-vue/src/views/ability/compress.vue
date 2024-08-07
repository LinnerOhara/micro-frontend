<script setup lang="ts">
import { ref } from 'vue'
import JSZip from 'jszip'

const fileRef = ref<HTMLInputElement>();
// const {compressFile} = useZip()

const compress = () =>
{ 
  const zip = new JSZip()
  Array.from(fileRef.value?.files ?? []).forEach( file =>
  {
    zip.file( file.name, file )
  } )
  zip.generateAsync({type:"blob"}).then(function(content) {
    const a = document.createElement('a');
    const url = URL.createObjectURL(content);
    a.href = url;
    a.download = 'example.zip';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  });
}
</script>

<template>
  <div class="container">
    <h4>上传：</h4>
    <input ref="fileRef" type="file" accept="*" multiple />
    <h4>功能：</h4>
    <button @click="compress">生成压缩包</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 440px;

  button {
    border-color: green;
  }
}
</style>