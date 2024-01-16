import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fileTypeFromBlob } from 'file-type-browser'
import { getDocument } from 'pdfjs-dist'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import { PDFDocument, StandardFonts } from 'pdf-lib'
// @ts-ignore
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

GlobalWorkerOptions.workerSrc = 'https://cdn-filestorage-testing.obs.cn-north-1.myhuaweicloud.com/pdfjs-dist@4.0.379/pdf.worker.js';
GlobalWorkerOptions.disableFontFace = true
GlobalWorkerOptions.cMapUrl = 'https://cdn-filestorage-testing.obs.cn-north-1.myhuaweicloud.com/pdfjs-dist@4.0.379/cmaps/'
GlobalWorkerOptions.cMapPacked = true

type FileType = {
  blob: Blob
  ext: string
  mime: string
}

@Component({
  selector: 'app-example4',
  templateUrl: './example4.component.html',
  styleUrls: ['./example4.component.scss']
})
export class Example4Component implements OnInit {
  @ViewChild('fabric') fabricRef!: ElementRef
  fileList: { url: string }[] = []
  maskVisible: boolean = false
  imageLoading: boolean = false
  imageName: string = '未命名'
  currentFileType?: FileType
  canvasInstance?: Canvas
  currentCanvasInfo?: {
    scaleX: number
    scaleY: number
    pointers: {
      x: number
      y: number
    }[]
    dotCanvasWidth?: number
  }

  get isPdf() {
    return this.currentFileType?.ext === 'pdf'
  }

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

  async fileClickHandle(url: string) {
    const screenWidth = window.innerWidth
    this.showMask()
    this.imageLoading = true
    this.currentFileType = await this.getFileType(url) as unknown as FileType
    let resourceUrl = URL.createObjectURL(this.currentFileType.blob)

    if (this.isPdf) {
      const pdf = await getDocument({
        url: url,
        cMapUrl: GlobalWorkerOptions.cMapUrl,
        cMapPacked: true
      }).promise
      const page = await pdf.getPage(1)
      const CSS_UNITS = 96.0 / 72.0
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = Math.floor(viewport.height * CSS_UNITS)
      canvas.width = Math.floor(viewport.width * CSS_UNITS);
      const renderContext = {
        transform: [CSS_UNITS, 0, 0, CSS_UNITS, 0, 0],
        canvasContext: context,
        viewport: viewport
      };
      const renderTask = page.render(renderContext as any);
      await renderTask.promise
      resourceUrl = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = resourceUrl;
      downloadLink.download = `modified.png`;
      downloadLink.click();
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
      this.currentCanvasInfo = {
        scaleX: scaleX,
        scaleY: scaleY,
        pointers: []
      }
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

  blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer); // 返回 ArrayBuffer
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(blob);
    })
  }

  async export() {
    if (this.canvasInstance) {
      // 将画布设置为原始图片的大小
      this.canvasInstance.setWidth(this.canvasInstance.getWidth() / this.currentCanvasInfo!.scaleX)
      this.canvasInstance.setHeight(this.canvasInstance.getHeight() / this.currentCanvasInfo!.scaleY)
      this.canvasInstance.viewportTransform = [1 / this.currentCanvasInfo!.scaleX, 0, 0, 1 / this.currentCanvasInfo!.scaleY, 0, 0]

      const image = this.canvasInstance.toDataURL()
      let result: {
        file?: Blob
      } = {}
      if (this.isPdf) {
        const pdfDoc = await PDFDocument.load(await this.blobToArrayBuffer(this.currentFileType!.blob))
        const firstPage = pdfDoc.getPage(0);
        const newPage = pdfDoc.addPage([firstPage.getWidth(), firstPage.getHeight()])

        const pdfImage = await pdfDoc.embedPng(image)
        newPage.drawImage(pdfImage, {
          x: 0,
          y: 0,
          width: firstPage.getWidth(),
          height: firstPage.getHeight()
        })
        pdfDoc.removePage(0)
        const modifiedPdfBytes = await pdfDoc.save();
        const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        result.file = modifiedPdfBlob
      } else {
        // 移除头部的 data URL 部分
        const base64Data = image.split(',')[1];
        // 将 Base64 字符串转换为二进制数据
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        // 创建一个 Blob 对象
        const blob = new Blob([binaryData], { type: 'image/png' });
        result.file = blob
      }
      this.canvasInstance.requestRenderAll()
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(result.file);
      downloadLink.download = `modified.${this.isPdf ? '.pdf' : '.png'}`;
      downloadLink.click();
      console.log(result)
    }
  }
}
