import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrandAdminGuard } from '../auth-management/auth/grand-admin.guard';
import { LoginGuard } from '../auth-management/auth/login.guard';
import { BookComponent } from './book/book.component';
import { AddFileComponent } from './file/add-file/add-file.component';
import { FileListComponent } from './file/file-list/file-list.component';
import { MoneyComponent } from './money/money.component';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';

const routes: Routes = [
  { path: 'todo-today', component: TodoTodayComponent, canActivate: [LoginGuard] },
  { path: 'note', component: NoteComponent, canActivate: [LoginGuard] },
  { path: 'money', component: MoneyComponent, canActivate: [GrandAdminGuard] },
  { path: 'book', component: BookComponent, canActivate: [GrandAdminGuard] },
  { path: 'file', component: FileListComponent, canActivate: [GrandAdminGuard] },
  { path: 'add-file', component: AddFileComponent, canActivate: [GrandAdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GhostManagementRoutingModule { }
