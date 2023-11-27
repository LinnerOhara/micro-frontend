import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';

const routes: Routes = [
  { path: 'example1', component: Example1Component },
  { path: 'example2', component: Example2Component }
]

@NgModule({
  declarations: [
    Example1Component,
    Example2Component
  ],
  imports: [
    CommonModule,
    NzIconModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FabricModule { }
