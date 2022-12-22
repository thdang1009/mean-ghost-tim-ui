import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth-management/auth/admin.guard';
import { BookComponent } from './book/book.component';
import { AddFileComponent } from './file/add-file/add-file.component';
import { FileListComponent } from './file/file-list/file-list.component';

const routes: Routes = [
  { path: 'book', title: `Book`, component: BookComponent, canActivate: [AdminGuard] },
  { path: 'file', title: `Add/Update File`, component: AddFileComponent, canActivate: [AdminGuard] },
  { path: 'file-list', title: `List File`, component: FileListComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagementRoutingModule { }
