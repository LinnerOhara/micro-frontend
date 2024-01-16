importScripts('localforage.min.js')

let chunks = [];
let file;
let totalChunks;
let uploadHistory = []
let notes;

const getList = () => {
  self.postMessage({
    type: "getList",
    data: uploadHistory.map(item => {
      delete item.blob
      return item
    })
  })
}

const checkUploadTask = () => {
  uploadHistory.forEach(item => {
    if (item.state !== 'Uploaded') {

    }
  })
}

localforage.getItem('readily_take_upload_history').then(res => {
  if (res) {
    uploadHistory = res
    getList()
    checkUploadTask()
  }
}).catch(err => {
  console.log('获取缓存失败', err)
})

self.addEventListener("message", (event) => {
  const { type } = event.data;
  
  if (type === "init") {
    file = event.data.file;
    notes = event.data.notes || '{}';
    totalChunks = event.data.totalChunks;
  } else if (type === "upload") {
    chunks[event.data.chunkIndex] = event.data.chunk;
  } else if (type === "merge") {
    mergeChunks();
  } else if (type === "getList") {
    getList();
  }
})

function mergeChunks() {
  const mergedBlob = new Blob(chunks, { type: file.type });
  // 这里可以发送 mergedBlob 到后台，使用后台来处理文件的存储等操作
  // 重置状态
  uploadHistory.push({
    blob: mergedBlob,
    fileName: file.name,
    type: file.type,
    percent: 0,
    state: 'NotUploaded',
    notes
  })
  console.log(uploadHistory)
  chunks = [];
  file = null;
  notes = null
  totalChunks = 0;
  localforage.setItem('readily_take_upload_history', uploadHistory)
}