import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmChartComponent } from './am-chart/am-chart.component';
import { JsonBeautifierComponent } from './json-beautifier/json-beautifier.component';
import { JsonExcelComponent } from './json-excel/json-excel.component';
import { RunJsComponent } from './run-js/run-js.component';
import { TextDiffComponent } from './text-diff/text-diff.component';

const routes: Routes = [
  { path: 'run-js', component: RunJsComponent },
  { path: 'am-chart', component: AmChartComponent },
  { path: 'json-beautifier', component: JsonBeautifierComponent },
  { path: 'json-excel', component: JsonExcelComponent },
  { path: 'text-diff', component: TextDiffComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsefulAppRoutingModule { }
