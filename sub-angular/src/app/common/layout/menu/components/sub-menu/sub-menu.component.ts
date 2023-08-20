import { Component, Input } from '@angular/core';

export type MenuData = {
  icon?: string
  path: string
  name: string,
  children: MenuData[]
}

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent {
  @Input() menuData: MenuData[] = ([] as MenuData[])
}
