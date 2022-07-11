import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsefulAppRoutingModule } from './useful-app-routing.module';
import { JsonBeautifierComponent } from './json-beautifier/json-beautifier.component';
import { RunJsComponent } from './run-js/run-js.component';
import { SharedModuleModule } from '@shares/shared-module.module';
import { CodeEditorModule } from '@ngstack/code-editor';
import { NgJsonEditorModule } from '@maaxgr/ang-jsoneditor';
import { JsonExcelComponent } from './json-excel/json-excel.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TextDiffComponent } from './text-diff/text-diff.component';
import { AmChartComponent } from './am-chart/am-chart.component';


@NgModule({
  declarations: [
    JsonBeautifierComponent,
    RunJsComponent,
    JsonExcelComponent,
    TextDiffComponent,
    AmChartComponent
  ],
  imports: [
    CommonModule,
    UsefulAppRoutingModule,
    SharedModuleModule,
    CodeEditorModule.forChild(),
    NgJsonEditorModule,
    NgxFileDropModule
  ]
})
export class UsefulAppModule { }
