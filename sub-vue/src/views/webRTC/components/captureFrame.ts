export function captureFrame(videoFile: File, time: number = 0): Promise<{
  url: string
  blob: Blob
}> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.currentTime = time;
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(videoFile)
    video.oncanplay = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const context = canvas.getContext('2d')
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob!)
        resolve({
          url,
          blob: blob!
        })
      })
    }
  })
}