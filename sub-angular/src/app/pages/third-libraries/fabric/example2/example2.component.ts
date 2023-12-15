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
  canvasInstance?: Canvas
  // 铅笔实例
  pencilBrushInstance?: PencilBrush
  imageList: { url: string }[] = []
  maskVisible: boolean = false
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
  currentImageUrl: string = ''
  canvas: {
    isDragging: boolean
    lastPosX: number
    lastPosY: number
  } = {
    isDragging: false,
    lastPosX: 0,
    lastPosY: 0
  }
  isDrawing: boolean = false
  // 原视图窗口
  originalViewport?: number[] = []
  currentPointer?: fabric.Object[] = []
  MAX_POINTER_NUM = 1
  canvasType: 'ImageEditing' | 'ImageOverlays' = 'ImageOverlays'
  pointers: { x: number, y: number }[] = [
    {
      x: 299.9999935435309,
      y: 160.0437435038505
    }
  ]

  ngOnInit(): void {
    this.imageList = [
      {
        url: "https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a0f2705-7c9e-e01b-458a-33fa994c03fc"
      },
      {
        url: "https://www.ffcafe.cn/images/avatars/rinne.jpg"
      },
      {
        url: "https://www.ffcafe.cn/images/avatars/rinne.jpg"
      },
      {
        url: "https://cdn.ifca.cloud/productHomeImage/yzg/top.jpg"
      },
      {
        url: 'https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a0f270b-618c-9ede-6e5f-385e7f67eb36'
      },
      {
        url: 'https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a0f270b-618c-9ede-6e5f-385e7f67eb36'
      },
      {
        url: 'https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a0f745c-5e66-c87b-1325-dd82d55723b5'
      },
      {
        url: 'https://erp286.ifca.com.cn:8443/zg-test/b/platform/api/app/fileStorage/downloadFileStream/3a0f745c-e1ba-dec5-8eb5-34e71a32c2f4'
      }
    ]
  }

  imageClick(url: string) {
    this.currentImageUrl = url
    this.repaintImage(url)
  }

  repaintImage(url: string) {
    const screenWidth = window.innerWidth

    this.imageLoading = true

    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);

        fabric.Image.fromURL(url, img => {
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
          this.canvasInstance?.setBackgroundImage(img, this.canvasInstance.renderAll.bind(this.canvasInstance), {
            scaleX: scaleX,
            scaleY: scaleY
          })
          this.saveCanvasState()
          this.onCanvasEvent()

          if (this.canvasType === 'ImageOverlays' && this.pointers) {
            this.pointers.forEach(item => {
              this.changePointer(item as any)
            })
          }
        })
        this.showMask()
      })
      .catch(() => {
        console.error('无法加载图片，请检查图片是否允许跨域')
      })
  }

  initPencilBrush() {
    if (this.canvasInstance) {
      this.isDrawing = true
      this.pencilBrushInstance = new fabric.PencilBrush(this.canvasInstance)
      this.currentColor = this.colorList[0]
      this.currentPencilWidth = this.pencilWidthList[1]
      this.pencilBrushInstance.color = this.currentColor
      this.pencilBrushInstance.width = this.currentPencilWidth
      this.canvasInstance.freeDrawingBrush = this.pencilBrushInstance
      // 开启绘制
      this.canvasInstance.isDrawingMode = true
    }
  }

  removePencilBrush() {
    if (this.pencilBrushInstance) {
      this.isDrawing = false
      this.canvasInstance!.isDrawingMode = false
      this.pencilBrushInstance = undefined
    }
  }

  saveCanvasState() {
    const currentState = this.canvasInstance?.toJSON(['id'])
    this.currentCanvasStateIndex++
    this.canvasState.splice(this.currentCanvasStateIndex, this.canvasState.length, currentState!)
    if (this.canvasInstance) {
      this.canvasInstance.forEachObject(obj => {
        obj.set({
          selectable: false,  // 使对象不可选
          evented: false,     // 禁用对象的事件处理
          // hasControls: false,  // 禁用对象的控制点
          // hasBorders: false,   // 禁用对象的边框
        })
      })
      this.canvasInstance.requestRenderAll()
    }
  }

  changePointer(point: fabric.Point, absolutePointer?: fabric.Point): void {
    let pointerIndex = this.currentPointer?.findIndex(item => item.containsPoint(point!))
    if (typeof pointerIndex === 'number' && pointerIndex !== -1) {
      this.canvasInstance?.remove(this.currentPointer?.[pointerIndex]!)
      this.currentPointer?.splice(pointerIndex, 1)
      return void 0
    }
    if (this.currentPointer && this.currentPointer?.length >= this.MAX_POINTER_NUM) {
      return void 0
    }
    const circle = new fabric.Circle({
      left: absolutePointer?.x || point.x,
      top: absolutePointer?.y || point.y,
      radius: 8,
      fill: 'red',
      selectable: false
    });
    this.canvasInstance?.add(circle)
    this.currentPointer?.push(circle)
  }

  onCanvasEvent() {
    if (this.canvasInstance) {
      this.originalViewport = [...this.canvasInstance.viewportTransform!]
      this.canvasInstance.on('mouse:up', () => {
        this.saveCanvasState()
      })
      this.canvasInstance.on('mouse:down', opt => { // 鼠标按下时触发
        let evt = opt.e
        let absolutePointer = opt.absolutePointer
        // if (evt.altKey === true) { // 是否按住alt
        //   this.canvas.isDragging = true // isDragging 是自定义的，开启移动状态
        //   this.canvas.lastPosX = evt.clientX // lastPosX 是自定义的
        //   this.canvas.lastPosY = evt.clientY // lastPosY 是自定义的
        // }
        // 如果不在编辑状态
        if (!this.isDrawing) {
          this.canvas.isDragging = true
          this.canvas.lastPosX = evt.clientX
          this.canvas.lastPosY = evt.clientY
        }
        this.changePointer(opt.pointer!, absolutePointer)
      })

      this.canvasInstance.on('mouse:move', opt => { // 鼠标移动时触发
        if (this.canvas.isDragging) {
          let evt = opt.e
          let vpt = this.canvasInstance?.viewportTransform // 聚焦视图的转换
          vpt![4] += evt.clientX - this.canvas.lastPosX
          vpt![5] += evt.clientY - this.canvas.lastPosY
          this.canvasInstance?.requestRenderAll() // 重新渲染
          this.canvas.lastPosX  = evt.clientX
          this.canvas.lastPosY  = evt.clientY
        }
        if(this.currentPointer?.some(pointer => pointer.containsPoint(opt.pointer!))) {
          this.canvasInstance!.defaultCursor = "pointer"
        } else {
          this.canvasInstance!.defaultCursor = "default"
        }
      })

      this.canvasInstance.on('mouse:up', opt => { // 鼠标松开时触发
        this.canvasInstance?.setViewportTransform(this.canvasInstance.viewportTransform!) // 设置此画布实例的视口转换
        this.canvas.isDragging = false // 关闭移动状态
      })

      // 监听鼠标滚轮事件
      this.canvasInstance.on('mouse:wheel', opt => {
        let delta = opt.e.deltaY // 滚轮向上滚一下是 -100，向下滚一下是 100
        let zoom = this.canvasInstance!.getZoom() // 获取画布当前缩放值
        opt.e.preventDefault()

        // 控制缩放范围在 0.01~20 的区间内
        zoom *= 0.999 ** delta
        if (zoom > 20) zoom = 20
        if (zoom < 0.01) zoom = 0.01

        // 设置画布缩放比例
        // 关键点！！！
        // 参数1：将画布的所放点设置成鼠标当前位置
        // 参数2：传入缩放值
        this.canvasInstance!.zoomToPoint(
          {
            x: opt.e.offsetX, // 鼠标x轴坐标
            y: opt.e.offsetY  // 鼠标y轴坐标
          },
          zoom // 最后要缩放的值
        )
      })
    }
  }

  offCanvasEvent() {
    if (this.canvasInstance) {
      this.canvasInstance.off('mouse:up')
      this.canvasInstance.off('mouse:down')
      this.canvasInstance.off('mouse:move')
      this.canvasInstance.off('mouse:wheel')
    }
  }

  clearCanvas() {
    this.destroyCanvas()
    this.repaintImage(this.currentImageUrl)
  }

  restoreOriginalState() {
    if (this.canvasInstance) {
      this.canvasInstance.setZoom(1)
      this.canvasInstance.setViewportTransform(this.originalViewport!)
    }
  }

  export() {
    if (this.canvasInstance) {
      let image = this.canvasInstance.toDataURL()
      this.restoreOriginalState()
      this.canvasInstance.requestRenderAll()
    }
  }

  undo() {
    if (this.currentCanvasStateIndex > 0) {
      this.currentCanvasStateIndex--
      const previousState = this.canvasState[this.currentCanvasStateIndex];
      this.canvasInstance?.loadFromJSON(previousState, () => {
        this.canvasInstance?.renderAll()
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

  destroyCanvas() {
    if (this.canvasInstance) {
      this.canvasInstance.dispose()
      this.canvasInstance = undefined
      this.offCanvasEvent()
    }
    this.removePencilBrush()
    this.currentCanvasStateIndex = -1
    this.canvasState = []
    this.currentPointer = []
    this.imageName = ''
  }

  showMask() {
    this.maskVisible = true
  }

  closeMask() {
    this.destroyCanvas()
    this.maskVisible = false
  }

  changeDrawState() {
    if (this.isDrawing) {
      this.removePencilBrush()
    } else {
      this.initPencilBrush()
    }
  }
}
