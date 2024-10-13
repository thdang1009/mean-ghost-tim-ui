import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuestLayoutRoutes } from './guest-layout.routing';
import { ReuseComponentModule } from '@reuse/reuse.module';
import { SharedModule } from '@shares/shared-module.module';
import { ComponentsModule } from '@components/components.module';
import { HomeComponent } from '@views/home/home.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GuestLayoutRoutes),
    ComponentsModule,
    ReuseComponentModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
  ]
})

export class GuestLayoutModule { }
