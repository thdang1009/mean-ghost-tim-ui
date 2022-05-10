
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableLoadingComponent } from './table-loading/table-loading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TableLoadingComponent,
  ],
  exports: [
    TableLoadingComponent
  ],
  providers: [
  ]
})
export class ReuseComponentModule { }
