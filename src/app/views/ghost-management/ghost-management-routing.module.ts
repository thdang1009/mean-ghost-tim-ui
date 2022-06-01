import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrandAdminGuard } from '../auth-management/auth/grand-admin.guard';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { FoodComponent } from './food/food.component';
import { MoneyComponent } from './money/money.component';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';

const routes: Routes = [
  { path: 'todo-today', component: TodoTodayComponent, canActivate: [LoginGuard] },
  { path: 'note', component: NoteComponent, canActivate: [LoginGuard] },
  { path: 'money', component: MoneyComponent, canActivate: [GrandAdminGuard] },
  // { path: 'food', component: FoodComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GhostManagementRoutingModule { }
