import { Component } from '@angular/core';
import menuData from './common/data/menuData'
import type { MenuData } from './common/layout/sub-menu/sub-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  collapsed: boolean = false
  menuData = menuData as MenuData[]
}
