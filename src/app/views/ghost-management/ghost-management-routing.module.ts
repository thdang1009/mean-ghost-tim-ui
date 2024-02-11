import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrandAdminGuard } from '../auth-management/auth/grand-admin.guard';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';
import { GuestMessageComponent } from './guest-message/guest-message.component';
// import { RunJsComponent } from './run-js/run-js.component';
import { AdminGuard } from '../auth-management/auth/admin.guard';
import { SystemComponent } from './system/system.component';

const routes: Routes = [
  { path: 'todo-today', title: `Todo Today`, component: TodoTodayComponent, canActivate: [LoginGuard] },
  { path: 'note', title: `Note`, component: NoteComponent, canActivate: [LoginGuard] },
  { path: 'guest-message', title: `List Guest Message`, component: GuestMessageComponent, canActivate: [GrandAdminGuard] },
  { path: 'system', title: `System`, component: SystemComponent, canActivate: [AdminGuard] },
  // { path: 'run-js', title: `Run JS`, component: RunJsComponent, canActivate: [GrandAdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GhostManagementRoutingModule { }
