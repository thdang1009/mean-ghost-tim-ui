import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonBeautifierComponent } from './json-beautifier/json-beautifier.component';
import { JsonExcelComponent } from './json-excel/json-excel.component';
import { RunJsComponent } from '../ghost-management/run-js/run-js.component';
import { TextDiffComponent } from './text-diff/text-diff.component';
import { TktCodeComponent } from './tkt-code/tkt-code.component';

const routes: Routes = [
  {
    path: 'json-beautifier',
    title: 'JSON Beautifier',
    component: JsonBeautifierComponent
  },
  {
    path: 'json-excel',
    title: 'JSON ⇋ Excel',
    component: JsonExcelComponent
  },
  {
    path: 'text-diff',
    title: 'Text diff',
    component: TextDiffComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsefulAppRoutingModule { }
