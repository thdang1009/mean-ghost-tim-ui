import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { AlgorithmsIndexComponent } from './algorithms-index/algorithms-index.component';
import { AndroidIndexComponent } from './android-index/android-index.component';
import { AngularIndexComponent } from './angular-index/angular-index.component';
import { CssIndexComponent } from './css-index/css-index.component';
import { GitIndexComponent } from './git-index/git-index.component';
import { HtmlIndexComponent } from './html-index/html-index.component';
import { JsIndexComponent } from './js-index/js-index.component';
import { MarkdownIndexComponent } from './markdown-index/markdown-index.component';
import { MongodbIndexComponent } from './mongodb-index/mongodb-index.component';
import { MysqlIndexComponent } from './mysql-index/mysql-index.component';
import { NodeJsIndexComponent } from './node-js-index/node-js-index.component';
import { ReactIndexComponent } from './react-index/react-index.component';
import { ReactNativeIndexComponent } from './react-native-index/react-native-index.component';
import { ThreeBookMainComponent } from './three-book-main/three-book-main.component';
import { TsIndexComponent } from './ts-index/ts-index.component';


const routes: Routes = [
  { path: 'js-index', component: JsIndexComponent },
  { path: 'node-js-index', component: NodeJsIndexComponent },
  { path: 'angular-index', component: AngularIndexComponent },
  { path: 'react-index', component: ReactIndexComponent },
  { path: 'html-index', component: HtmlIndexComponent },
  { path: 'css-index', component: CssIndexComponent },
  { path: 'git-index', component: GitIndexComponent },
  { path: 'mongodb-index', component: MongodbIndexComponent },
  { path: 'ts-index', component: TsIndexComponent },
  { path: 'algorithms-index', component: AlgorithmsIndexComponent },
  { path: 'android-index', component: AndroidIndexComponent },
  { path: 'mysql-index', component: MysqlIndexComponent },
  { path: 'react-native-index', component: ReactNativeIndexComponent },
  { path: 'three-book', component: ThreeBookMainComponent, canActivate: [LoginGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeIndexRoutingModule { }
