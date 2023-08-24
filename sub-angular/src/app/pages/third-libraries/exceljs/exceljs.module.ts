import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Example1Component } from './example1/example1.component';

const routes: Routes = [
  { path: 'example1', component: Example1Component }
]

@NgModule({
  declarations: [
    Example1Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExceljsModule { }
