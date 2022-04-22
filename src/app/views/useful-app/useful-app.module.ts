import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsefulAppRoutingModule } from './useful-app-routing.module';
import { JsonBeautifierComponent } from './json-beautifier/json-beautifier.component';
import { RunJsComponent } from './run-js/run-js.component';
import { SharedModuleModule } from '@shares/shared-module.module';
import { CodeEditorModule } from '@ngstack/code-editor';


@NgModule({
  declarations: [
    JsonBeautifierComponent,
    RunJsComponent
  ],
  imports: [
    CommonModule,
    UsefulAppRoutingModule,
    SharedModuleModule,
    CodeEditorModule.forChild(),
  ]
})
export class UsefulAppModule { }
