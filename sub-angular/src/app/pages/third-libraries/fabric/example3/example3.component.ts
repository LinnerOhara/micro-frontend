import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fileTypeFromBlob } from 'file-type-browser'
import { getDocument, PDFWorker } from 'pdfjs-dist'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
// @ts-ignore
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

// 设置 PDF.js Worker 的路径
// GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.js';
GlobalWorkerOptions.workerSrc = 'https://cdn-filestorage-testing.obs.cn-north-1.myhuaweicloud.com/pdfjs-dist@4.0.379/pdf.worker.js';
GlobalWorkerOptions.disableFontFace = true
// GlobalWorkerOptions.cMapUrl = 'https://unpkg.com/browse/pdfjs-dist@4.0.379/cmaps/'
GlobalWorkerOptions.cMapUrl = 'https://cdn-filestorage-testing.obs.cn-north-1.myhuaweicloud.com/pdfjs-dist@4.0.379/cmaps/'
GlobalWorkerOptions.cMapPacked = true

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.scss']
})
export class Example3Component implements OnInit {
  @ViewChild('fabric') fabricRef!: ElementRef
  fileList: { url: string }[] = []
  maskVisible: boolean = false
  imageName: string = ''
  // 图片加载
  imageLoading: boolean = false
  // 画布实例
  canvasInstance?: Canvas
  currentScaleX: number = 0
  currentScaleY: number = 0
  currentFileType?: {
    ext: string
    mime: string
    blob: Blob
  }
  pdfInstance?: any

  constructor(
  ) {}

  ngOnInit(): void {
    this.fileList = [
      {
        url: 'https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a1009f6-cf21-d2e3-6bd7-9dbc8592358a'
      },
      {
        url: 'https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a1009f9-0ee8-b7d4-6a36-00759d4f4184'
      },
      {
        url: 'https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a0f2705-7c9e-e01b-458a-33fa994c03fc'
      }
    ]
  }

  async getFileType(url: string) {
    const response = await (await fetch(url)).blob()
    const type: Record<string, any> = await fileTypeFromBlob(response)
    return {
      ...type,
      blob: response
    }
  }

  async readBlob(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result))
      reader.addEventListener('error', reject)
      reader.readAsDataURL(blob)
    })
  }

  async fileClickHandle(url: string) {
    const screenWidth = window.innerWidth
    this.showMask()
    this.imageLoading = true
    this.currentFileType = await this.getFileType(url) as unknown as {
      blob: Blob,
      ext: string,
      mime: string
    }
    let resourceUrl = URL.createObjectURL(this.currentFileType.blob);

    if (this.currentFileType.ext === 'pdf') {
      this.pdfInstance = await getDocument({
        url: url,
        cMapUrl: GlobalWorkerOptions.cMapUrl,
        cMapPacked: true
      }).promise
      const page = await this.pdfInstance.getPage(1)
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext as any);
      await renderTask.promise
      resourceUrl = canvas.toDataURL('image/png');
    }
    fabric.Image.fromURL(resourceUrl, img => {
      this.imageLoading = false
      this.canvasInstance = new fabric.Canvas(this.fabricRef.nativeElement, {
        width: screenWidth * 0.4,
        height: 0,
        selection: false
      })
      this.imageName = img.name || '未命名'
      const windowHeight = window.innerHeight
      // 是否过高
      const isOverHeight = img.height! * 0.4 > windowHeight
      // 计算画布的高度，保持图片比例
      const scaleX = this.canvasInstance!.getWidth() / img.width!
      const canvasHeight = isOverHeight ? windowHeight * 0.8 : scaleX * img.height!;
      // 设置画布的高度
      this.canvasInstance?.setHeight(canvasHeight);
      const scaleY = isOverHeight ? scaleX : this.canvasInstance.getHeight() / img.height!
      this.currentScaleX = scaleX
      this.currentScaleY = scaleY
      this.canvasInstance?.setBackgroundImage(img, this.canvasInstance.renderAll.bind(this.canvasInstance), {
        scaleX: scaleX,
        scaleY: scaleY
      })
    })
  }

  showMask() {
    this.maskVisible = true
  }

  closeMask() {
    this.maskVisible = false
  }

  clearCanvas() {

  }

  async export() {
    if (this.canvasInstance) {
      // 将画布设置为原始图片的大小
      this.canvasInstance.setWidth(this.canvasInstance.getWidth() / this.currentScaleX)
      this.canvasInstance.setHeight(this.canvasInstance.getHeight() / this.currentScaleY)


      let file
      if (this.currentFileType?.ext === 'pdf') {
        file = this.canvasInstance.toDataURL()
      } else {
        file = this.canvasInstance.toDataURL()
      }
      const img = new Image()
      img.src = file
      img.onload = (res => {
        console.log(res)
        console.log(img.width, img.height)
        console.log(this.currentScaleX, this.currentScaleY)
      })
      // 移除头部的 data URL 部分
      const base64Data = file.split(',')[1];
      // 将 Base64 字符串转换为二进制数据
      const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      // 创建一个 Blob 对象
      const blob = new Blob([binaryData], { type: 'image/png' });
      let result = {
        file: blob,
      }
      this.canvasInstance.requestRenderAll()
    }
  }
}
