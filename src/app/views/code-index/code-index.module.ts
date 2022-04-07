import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeIndexRoutingModule } from './code-index-routing.module';
import { AngularIndexComponent } from './angular-index/angular-index.component';
import { CssIndexComponent } from './css-index/css-index.component';
import { HtmlIndexComponent } from './html-index/html-index.component';
import { SharedModuleModule } from '@shares/shared-module.module';


@NgModule({
  declarations: [
    AngularIndexComponent,
    CssIndexComponent,
    HtmlIndexComponent
  ],
  imports: [
    CommonModule,
    CodeIndexRoutingModule,
    SharedModuleModule
  ]
})
export class CodeIndexModule { }
