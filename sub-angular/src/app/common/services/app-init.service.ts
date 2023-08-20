import { Injectable } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private nzIconsevice: NzIconService
  ) { }

  initializeApp() {
    // @ts-ignore
    this.nzIconsevice.changeAssetsSource(window.__POWERED_BY_QIANKUN__ ? __webpack_public_path__ : '/')
  }
}
