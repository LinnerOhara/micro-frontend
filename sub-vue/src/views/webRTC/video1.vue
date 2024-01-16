<script setup lang="ts">
import { ref, onMounted } from 'vue';

const recording = ref<any>(false);
const mediaRecorder = ref<any>(null);
const recordedChunks = ref<any>([]);
const videoElement = ref<any>(null);
const videoResult = ref<any>(null);
const imgResult = ref<any>(null);
const type = ref<'video' | 'photo'>('video')

const startRecording = async () => {
  console.log(navigator)
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoElement.value.srcObject = stream;
    mediaRecorder.value = new MediaRecorder(stream);

    mediaRecorder.value.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        console.log(event)
        recordedChunks.value.push(event.data);
        updateVideo(); // 实时更新视频画面
      }
    };

    mediaRecorder.value!.onstop = () => {
      // 处理录制完成后的数据，可以上传到服务器或进行其他操作 video/webm
      const recordedBlob = new Blob(recordedChunks.value, { type: 'video/mp4' });
      videoElement.value.srcObject = null; // 停止显示摄像头画面
      console.log(recordedBlob)
      
      // 将 Blob 转换为 Data URL
      const videoDataURL = URL.createObjectURL(recordedBlob);

      // 显示截取的图像
      const image = new Image();
      image.src = videoDataURL;
      document.body.appendChild(image);
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

const takePhoto = () => {

};

const updateVideo = () => {
  // 更新 video 元素以显示实时画面
  const blob = new Blob(recordedChunks.value, { type: 'video/mp4' });
  const url = URL.createObjectURL(blob);
  videoElement.value.src = url;
};

function init() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(function(stream) {
    
    videoElement.value.srcObject = stream;
    mediaRecorder.value = new MediaRecorder(stream);
    mediaRecorder.value.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        console.log(event)
        recordedChunks.value.push(event.data);
        updateVideo(); // 实时更新视频画面
      }
    };

    mediaRecorder.value!.onstop = () => {
      // 处理录制完成后的数据，可以上传到服务器或进行其他操作 video/webm
      const recordedBlob = new Blob(recordedChunks.value, { type: 'video/mp4' });
      videoElement.value.srcObject = null; // 停止显示摄像头画面
      console.log(recordedBlob)
      
      // 将 Blob 转换为 Data URL
      const videoDataURL = URL.createObjectURL(recordedBlob);

      // 显示截取的图像
      const image = new Image();
      image.src = videoDataURL;
      document.body.appendChild(image);
    };

    mediaRecorder.value.start();
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
    <video ref="videoElement" class="recorder" autoplay></video>
    <button @click="startRecording" :disabled="recording">开始录制</button>
    <button @click="stopRecording" :disabled="!recording">停止录制</button>
    <button @click="takePhoto">拍照</button>
    <div>
      <h4>结果</h4>
      <video v-if="type === 'video'" ref="videoResult" autoplay></video>
      <img v-if="type === 'photo'" ref="imgResult" />
    </div>
  </div>
</template>

<style scoped>
.recorder {
  width: 95%;
  overflow: hidden;
}
</style>
