import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeIndexRoutingModule } from './code-index-routing.module';
import { SharedModule } from '@shares/shared-module.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GhostPdfViewerComponent } from './ghost-pdf-viewer/ghost-pdf-viewer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThreeBookMainComponent } from './three-book-main/three-book-main.component';
import { DymanicIndexComponent } from './dymanic-index/dymanic-index.component';


// đọc file pdf rồi parse ra thành cái html

@NgModule({
  declarations: [
    GhostPdfViewerComponent,
    ThreeBookMainComponent,
    DymanicIndexComponent,
  ],
  imports: [
    CommonModule,
    CodeIndexRoutingModule,
    SharedModule,
    PdfViewerModule,
    DragDropModule
  ]
})
export class CodeIndexModule { }
