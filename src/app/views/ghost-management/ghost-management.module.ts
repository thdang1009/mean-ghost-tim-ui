import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GhostManagementRoutingModule } from './ghost-management-routing.module';
import { MoneyComponent } from './money/money.component';
import { NoteComponent } from './note/note.component';
import { TodoTodayComponent } from './todo-today/todo-today.component';
import { FoodComponent } from './food/food.component';
import { SharedModuleModule } from '@shares/shared-module.module';


@NgModule({
  declarations: [
    MoneyComponent,
    NoteComponent,
    TodoTodayComponent,
    FoodComponent
  ],
  imports: [
    CommonModule,
    GhostManagementRoutingModule,
    SharedModuleModule
  ],
  providers: [
    DatePipe,
  ]
})
export class GhostManagementModule { }
