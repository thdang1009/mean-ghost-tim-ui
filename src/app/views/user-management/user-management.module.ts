import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SharedModuleModule } from '@shares/shared-module.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModuleModule
  ]
})
export class UserManagementModule { }
