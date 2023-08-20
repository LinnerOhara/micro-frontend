import { Component } from '@angular/core';
import menuData from '../../../../app/common/data/menuData'
import type { MenuData } from './components/sub-menu/sub-menu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuData = menuData as MenuData[]
}
