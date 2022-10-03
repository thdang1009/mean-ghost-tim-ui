import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { AngularIndexComponent } from './angular-index/angular-index.component';
import { CssIndexComponent } from './css-index/css-index.component';
import { GitIndexComponent } from './git-index/git-index.component';
import { HtmlIndexComponent } from './html-index/html-index.component';
import { JsIndexComponent } from './js-index/js-index.component';
import { MarkdownIndexComponent } from './markdown-index/markdown-index.component';
import { MongodbIndexComponent } from './mongodb-index/mongodb-index.component';
import { NodeJsIndexComponent } from './node-js-index/node-js-index.component';
import { ReactIndexComponent } from './react-index/react-index.component';
import { ThreeBookMainComponent } from './three-book-main/three-book-main.component';


const routes: Routes = [
  { path: 'angular-index', component: AngularIndexComponent },
  { path: 'html-index', component: HtmlIndexComponent },
  { path: 'css-index', component: CssIndexComponent },
  { path: 'js-index', component: JsIndexComponent },
  { path: 'git-index', component: GitIndexComponent },
  { path: 'node-js-index', component: NodeJsIndexComponent },
  { path: 'mongodb-index', component: MongodbIndexComponent },
  { path: 'react-index', component: ReactIndexComponent },
  { path: 'markdown-index', component: MarkdownIndexComponent },
  { path: 'three-book', component: ThreeBookMainComponent, canActivate: [LoginGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeIndexRoutingModule { }
