import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeIndexRoutingModule } from './code-index-routing.module';
import { AngularIndexComponent } from './angular-index/angular-index.component';
import { CssIndexComponent } from './css-index/css-index.component';
import { HtmlIndexComponent } from './html-index/html-index.component';
import { SharedModuleModule } from '@shares/shared-module.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GitIndexComponent } from './git-index/git-index.component';
import { JsIndexComponent } from './js-index/js-index.component';
import { MongodbIndexComponent } from './mongodb-index/mongodb-index.component';
import { NodeJsIndexComponent } from './node-js-index/node-js-index.component';
import { ReactIndexComponent } from './react-index/react-index.component';
import { GhostPdfViewerComponent } from './ghost-pdf-viewer/ghost-pdf-viewer.component';

// đọc file pdf rồi parse ra thành cái html

@NgModule({
  declarations: [
    AngularIndexComponent,
    CssIndexComponent,
    HtmlIndexComponent,
    GitIndexComponent,
    JsIndexComponent,
    MongodbIndexComponent,
    NodeJsIndexComponent,
    ReactIndexComponent,
    GhostPdfViewerComponent,
  ],
  imports: [
    CommonModule,
    CodeIndexRoutingModule,
    SharedModuleModule,
    PdfViewerModule
  ]
})
export class CodeIndexModule { }
