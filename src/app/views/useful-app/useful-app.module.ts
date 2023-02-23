import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsefulAppRoutingModule } from './useful-app-routing.module';
import { JsonBeautifierComponent } from './json-beautifier/json-beautifier.component';
// import { RunJsComponent } from './run-js/run-js.component';
import { SharedModule } from '@shares/shared-module.module';
// import { CodeEditorModule } from '@ngstack/code-editor';
import { NgJsonEditorModule } from '@maaxgr/ang-jsoneditor';
import { JsonExcelComponent } from './json-excel/json-excel.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TextDiffComponent } from './text-diff/text-diff.component';


@NgModule({
  declarations: [
    JsonBeautifierComponent,
    // RunJsComponent,
    JsonExcelComponent,
    TextDiffComponent,
  ],
  imports: [
    CommonModule,
    UsefulAppRoutingModule,
    SharedModule,
    // CodeEditorModule.forChild(),
    NgJsonEditorModule,
    NgxFileDropModule,
  ]
})
export class UsefulAppModule { }
