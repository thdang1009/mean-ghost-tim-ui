import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrandAdminGuard } from '../auth-management/auth/grand-admin.guard';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';
import { GuestMessageComponent } from './guest-message/guest-message.component';

const routes: Routes = [
  { path: 'todo-today', title: `Todo Today`, component: TodoTodayComponent, canActivate: [LoginGuard] },
  { path: 'note', title: `Note`, component: NoteComponent, canActivate: [LoginGuard] },
  { path: 'guest-message', title: `List Guest Message`, component: GuestMessageComponent, canActivate: [GrandAdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GhostManagementRoutingModule { }
