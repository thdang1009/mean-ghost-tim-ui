import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { DymanicIndexComponent } from './dymanic-index/dymanic-index.component';
import { ThreeBookMainComponent } from './three-book-main/three-book-main.component';


const routes: Routes = [
  { path: 'js-index', title: `Javascript's books`, component: DymanicIndexComponent },
  { path: 'node-js-index', title: `NodeJS's books`, component: DymanicIndexComponent },
  { path: 'angular-index', title: `Angular's books`, component: DymanicIndexComponent },
  { path: 'react-index', title: `React's books`, component: DymanicIndexComponent },
  { path: 'html-index', title: `HTML's books`, component: DymanicIndexComponent },
  { path: 'css-index', title: `Css's books`, component: DymanicIndexComponent },
  { path: 'git-index', title: `Git's books`, component: DymanicIndexComponent },
  { path: 'mongodb-index', title: `MongoDB's books`, component: DymanicIndexComponent },
  { path: 'ts-index', title: `Typescript's books`, component: DymanicIndexComponent },
  { path: 'algorithms-index', title: `Algorithm's books`, component: DymanicIndexComponent },
  { path: 'android-index', title: `Android's books`, component: DymanicIndexComponent },
  { path: 'mysql-index', title: `Mysql's books`, component: DymanicIndexComponent },
  { path: 'react-native-index', title: `React Native's books`, component: DymanicIndexComponent },
  { path: 'three-book', title: `Current reading books`, component: ThreeBookMainComponent, canActivate: [LoginGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeIndexRoutingModule { }
