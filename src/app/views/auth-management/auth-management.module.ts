import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthManagementRoutingModule } from './auth-management-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { SharedModuleModule } from '@shares/shared-module.module';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthManagementRoutingModule,
    SharedModuleModule
  ]
})
export class AuthManagementModule { }
