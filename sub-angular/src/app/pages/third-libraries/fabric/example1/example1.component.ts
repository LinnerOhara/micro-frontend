import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fabric } from 'fabric'
import type { StaticCanvas, Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements AfterViewInit {
  @ViewChild('fabric') fabricRef!: ElementRef
  @ViewChild('fabric2') fabricRef2!: ElementRef
  canvanInstance?: StaticCanvas
  canvanInstance2?: Canvas

  constructor() {
    console.log(fabric);
  }

  ngAfterViewInit(): void {
    this.canvanInstance = new fabric.StaticCanvas(this.fabricRef.nativeElement, {
      width: 400,
      height: 400
    })
    this.canvanInstance2 = new fabric.Canvas(this.fabricRef2.nativeElement, {
      width: 400,
      height: 400
    })
    fabric.Image.fromURL('https://www.ffcafe.cn/images/avatars/rinne.jpg', img => {
      this.canvanInstance?.setBackgroundImage(img, this.canvanInstance.renderAll.bind(this.canvanInstance), {
        scaleX: this.canvanInstance.getWidth() / img.width!,
        scaleY: this.canvanInstance.getHeight() / img.height!
      })

      this.canvanInstance2?.setBackgroundImage(img, this.canvanInstance2.renderAll.bind(this.canvanInstance2), {
        // 使背景图缩放填充
        scaleX: this.canvanInstance2.getWidth() / img.width!,
        scaleY: this.canvanInstance2.getHeight() / img.height!
      })
    })
  }
}
