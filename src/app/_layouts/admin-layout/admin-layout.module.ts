import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '@views/dashboard/dashboard.component';
import { ReuseComponentModule } from '@app/_reuse/reuse.module';
import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReuseComponentModule,
    CodeEditorModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
  ],
  exports: [
    CodeEditorModule,
  ]
})

export class AdminLayoutModule { }
