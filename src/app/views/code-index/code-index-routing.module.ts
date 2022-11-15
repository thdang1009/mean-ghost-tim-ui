import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { DymanicIndexComponent } from './dymanic-index/dymanic-index.component';
import { ThreeBookMainComponent } from './three-book-main/three-book-main.component';


const routes: Routes = [
  { path: 'js-index', component: DymanicIndexComponent },
  { path: 'node-js-index', component: DymanicIndexComponent },
  { path: 'angular-index', component: DymanicIndexComponent },
  { path: 'react-index', component: DymanicIndexComponent },
  { path: 'html-index', component: DymanicIndexComponent },
  { path: 'css-index', component: DymanicIndexComponent },
  { path: 'git-index', component: DymanicIndexComponent },
  { path: 'mongodb-index', component: DymanicIndexComponent },
  { path: 'ts-index', component: DymanicIndexComponent },
  { path: 'algorithms-index', component: DymanicIndexComponent },
  { path: 'android-index', component: DymanicIndexComponent },
  { path: 'mysql-index', component: DymanicIndexComponent },
  { path: 'react-native-index', component: DymanicIndexComponent },
  { path: 'three-book', component: ThreeBookMainComponent, canActivate: [LoginGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeIndexRoutingModule { }
