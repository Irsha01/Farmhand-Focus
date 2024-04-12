import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';



@NgModule({
  declarations: [SupportComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SupportComponent
  ]
})
export class SupportModule { }
