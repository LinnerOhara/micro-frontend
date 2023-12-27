<script setup lang="ts">
import { ref, onMounted } from 'vue';

const recording = ref<any>(false);
const mediaRecorder = ref<any>(null);
const recordedChunks = ref<any>([]);
const videoElement = ref<any>(null);

const startRecording = async () => {
  console.log(navigator)
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoElement.value.srcObject = stream;
    mediaRecorder.value = new MediaRecorder(stream);

    mediaRecorder.value.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        recordedChunks.value.push(event.data);
        updateVideo(); // 实时更新视频画面
      }
    };

    mediaRecorder.value!.onstop = () => {
      // 处理录制完成后的数据，可以上传到服务器或进行其他操作
      const recordedBlob = new Blob(recordedChunks.value, { type: 'video/webm' });
      videoElement.value.srcObject = null; // 停止显示摄像头画面
      recordedChunks.value = recordedBlob;
    };

    mediaRecorder.value.start();
    recording.value = true;
  } catch (error) {
    console.error('getUserMedia error:', error);
  }
};

const stopRecording = () => {
  mediaRecorder.value.stop();
  recording.value = false;
};

const updateVideo = () => {
  // 更新 video 元素以显示实时画面
  const blob = new Blob(recordedChunks.value, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  videoElement.value.src = url;
};

function init() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(function(stream) {
    console.log(stream)
  })
  .catch(function(error) {
    // 处理用户不同意访问摄像头和麦克风的情况
    console.error('getUserMedia error:', error);
  });
}

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <video ref="videoElement" width="640" height="480" autoplay></video>
    <button @click="startRecording" :disabled="recording">Start Recording</button>
    <button @click="stopRecording" :disabled="!recording">Stop Recording</button>
  </div>
</template>

<style scoped>
</style>
