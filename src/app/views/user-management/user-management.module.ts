import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SharedModule } from '@shares/shared-module.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ReuseComponentModule } from '@reuse/reuse.module';


@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    ReuseComponentModule
  ]
})
export class UserManagementModule { }
