import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  LandingComponent } from './landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavModule } from '../sidenav/sidenav.module';
import { SupportModule } from '../support/support.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
    SupportModule
    
  ],
  exports: [LandingComponent],
})
export class LandingModule { }
