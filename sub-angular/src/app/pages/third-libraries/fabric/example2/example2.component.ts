import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { fabric } from 'fabric'
import { Canvas, PencilBrush, Object } from 'fabric/fabric-impl'

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit {
  @ViewChild('fabric') fabricRef!: ElementRef
  // 画布实例
  canvanInstance?: Canvas
  // 铅笔实例
  pencilBrushInstance?: PencilBrush
  imageList: { url: string }[] = []
  maskVisivle: boolean = false
  imageName: string = ''
  // 图片加载
  imageLoading: boolean = false
  // 画笔颜色列表
  colorList: string[] = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#00bcd4', '#2196f3', '#9c27b0', '#fff']
  // 画笔宽度列表
  pencilWidthList: number[] = [2, 4, 6, 8]
  // 当前画笔颜色
  currentColor: string = ''
  // 当前画笔宽度
  currentPencilWidth: number = 0
  // 当前画布状态索引
  currentCanvasStateIndex: number = -1
  canvasState: { objects: Object[], version: string }[] = []

  ngOnInit(): void {
    this.imageList = [
      {
        url: "https://www.ffcafe.cn/images/avatars/rinne.jpg"
      },
      {
        url: "https://www.ffcafe.cn/images/avatars/rinne.jpg"
      },
      {
        url: "https://www.ffcafe.cn/images/avatars/rinne.jpg"
      },
    ]
  }

  repaintImage(url: string) {
    const screenWidth = window.innerWidth

    this.imageLoading = true
    fabric.Image.fromURL(url, img => {
      this.imageLoading = false

      this.canvanInstance = new fabric.Canvas(this.fabricRef.nativeElement, {
        width: screenWidth * 0.5,
        height: 0
      })
      this.imageName = img.name || '未命名'
      // 计算画布的高度，保持图片比例
      const canvasHeight = (this.canvanInstance!.getWidth() / img.width!) * img.height!;
      // 设置画布的高度
      this.canvanInstance?.setHeight(canvasHeight);
      this.canvanInstance?.setBackgroundImage(img, this.canvanInstance.renderAll.bind(this.canvanInstance), {
        scaleX: this.canvanInstance.getWidth() / img.width!,
        scaleY: this.canvanInstance.getHeight() / img.height!
      })
      this.initPencilBrush()
      this.saveCanvasState()
      this.canvanInstance.on('mouse:up', () => {
        this.saveCanvasState()
      })
    })
    this.showMask()
  }

  initPencilBrush() {
    if (this.canvanInstance) {
      this.pencilBrushInstance = new fabric.PencilBrush(this.canvanInstance)
      this.currentColor = this.colorList[0]
      this.currentPencilWidth = this.pencilWidthList[1]
      this.pencilBrushInstance.color = this.currentColor
      this.pencilBrushInstance.width = this.currentPencilWidth
      this.canvanInstance.freeDrawingBrush = this.pencilBrushInstance
      // 开启绘制
      this.canvanInstance.isDrawingMode = true
    }
  }

  saveCanvasState() {
    const currentState = this.canvanInstance?.toJSON(['id'])
    this.currentCanvasStateIndex++
    this.canvasState.splice(this.currentCanvasStateIndex, this.canvasState.length, currentState!)
  }

  undo() {
    if (this.currentCanvasStateIndex > 0) {
      this.currentCanvasStateIndex--
      const previousState = this.canvasState[this.currentCanvasStateIndex];
      this.canvanInstance?.loadFromJSON(previousState, () => {
        this.canvanInstance?.renderAll()
      })
    }
  }

  changePencilColor(color: string) {
    this.currentColor = color
    if (this.pencilBrushInstance) {
      this.pencilBrushInstance.color = color
    }
  }

  changePencilWidth(width: number) {
    this.currentPencilWidth = width
    if (this.pencilBrushInstance) {
      this.pencilBrushInstance.width = width
    }
  }

  distoryCanvas() {
    if (this.canvanInstance) {
      this.canvanInstance.off('mouse:up')
      this.canvanInstance.dispose()
      this.canvanInstance = undefined
    }
    this.currentCanvasStateIndex = -1
    this.canvasState = []
    this.imageName = ''
  }

  showMask() {
    this.maskVisivle = true
  }

  closeMask() {
    this.distoryCanvas()
    this.maskVisivle = false
  }
}
