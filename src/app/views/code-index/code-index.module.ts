import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeIndexRoutingModule } from './code-index-routing.module';
import { SharedModule } from '@shares/shared-module.module';

import { ThreeBookMainComponent } from './three-book-main/three-book-main.component';
import { DymanicIndexComponent } from './dymanic-index/dymanic-index.component';
import { ComponentsModule } from '@app/components/components.module';


// đọc file pdf rồi parse ra thành cái html

@NgModule({
  declarations: [
    ThreeBookMainComponent,
    DymanicIndexComponent,
  ],
  imports: [
    CommonModule,
    CodeIndexRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class CodeIndexModule { }
