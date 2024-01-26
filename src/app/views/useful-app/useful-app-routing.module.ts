import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonBeautifierComponent } from './json-beautifier/json-beautifier.component';
import { JsonExcelComponent } from './json-excel/json-excel.component';
import { RunJsComponent } from './run-js/run-js.component';
import { TextDiffComponent } from './text-diff/text-diff.component';
import { TktCodeComponent } from './tkt-code/tkt-code.component';

const routes: Routes = [
  {
    path: 'run-js',
    title: 'Javascript\'s playground',
    component: RunJsComponent
  },
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
  // {
  //   path: 'tkt-code',
  //   title: 'Auto run code',
  //   component: TktCodeComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsefulAppRoutingModule { }
