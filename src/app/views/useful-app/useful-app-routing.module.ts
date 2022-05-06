import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularIndexComponent } from '../code-index/angular-index/angular-index.component';
import { CssIndexComponent } from '../code-index/css-index/css-index.component';
import { HtmlIndexComponent } from '../code-index/html-index/html-index.component';
import { JsonBeautifierComponent } from './json-beautifier/json-beautifier.component';
import { JsonExcelComponent } from './json-excel/json-excel.component';
import { RunJsComponent } from './run-js/run-js.component';

const routes: Routes = [
  { path: 'run-js', component: RunJsComponent },
  { path: 'json-beautifier', component: JsonBeautifierComponent },
  { path: 'json-excel', component: JsonExcelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsefulAppRoutingModule { }
