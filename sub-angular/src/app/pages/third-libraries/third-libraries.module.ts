import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'exceljs', loadChildren: () => import('./exceljs/exceljs.module').then(m => m.ExceljsModule) },
  { path: 'fabric', loadChildren: () => import('./fabric/fabric.module').then(m => m.FabricModule) }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ThirdLibrariesModule { }
