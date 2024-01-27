import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrandAdminGuard } from '../auth-management/auth/grand-admin.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'add-user',
    title: 'Add User',
    component: AddUserComponent,
    canActivate: [GrandAdminGuard]
  },
  {
    path: 'user-list',
    title: 'List User',
    component: UserListComponent,
    canActivate: [GrandAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
