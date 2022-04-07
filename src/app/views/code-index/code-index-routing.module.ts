import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularIndexComponent } from './angular-index/angular-index.component';
import { CssIndexComponent } from './css-index/css-index.component';
import { HtmlIndexComponent } from './html-index/html-index.component';


const routes: Routes = [
  { path: 'angular-index', component: AngularIndexComponent },
  { path: 'css-index', component: CssIndexComponent },
  { path: 'html-index', component: HtmlIndexComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeIndexRoutingModule { }
