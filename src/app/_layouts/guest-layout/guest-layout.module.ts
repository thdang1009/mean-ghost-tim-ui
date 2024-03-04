import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuestLayoutRoutes } from './guest-layout.routing';
import { HomeComponent } from '@app/views/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from '@app/components/components.module';
import { ReuseComponentModule } from '@app/_reuse/reuse.module';
import { SharedModule } from '@app/_shares/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GuestLayoutRoutes),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    ComponentsModule,
    ReuseComponentModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
  ]
})

export class GuestLayoutModule { }
